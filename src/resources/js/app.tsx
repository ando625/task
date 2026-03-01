import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import axios from "axios";
import { User } from "./Components/TaskCard";


// App.tsx (全体の司令塔：isLogin や isAuthenticated を管理)
//  ├── Header.tsx (ナビゲーション：ログイン/登録/ログアウトの切替)
//  └── Layout.tsx (背景色や中央寄せなどの共通外枠)
//        ├── LoginForm.tsx (ログイン画面)
//        │     ├── InputField.tsx (メール)
//        │     ├── InputField.tsx (パスワード)
//        │     └── SubmitButton.tsx (ログイン)
//        ├── RegisterForm.tsx (新規登録画面)
//        │     ├── InputField.tsx (名前)
//        │     ├── InputField.tsx (メール)
//        │     ├── InputField.tsx (パスワード)
//        │     ├── InputField.tsx (パスワード確認)
//        │     └── SubmitButton.tsx (登録)
//        └── Dashboard.tsx (ログイン後の画面)
//              ├── TaskColumn.tsx (「進行中」などの縦列)
//              │     └── TaskCard.tsx (★自分の青いカード)
//              └── TeamTaskSection.tsx (下のグレーのエリア)
//                    └── TaskCard.tsx (★チームのグレーのカード)


// クッキーを毎回送るための合言葉
axios.defaults.withCredentials = true;

// laravel側でAPIの判別がつくように設定
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default function App(): JSX.Element {

    const [me, setMe] = useState<{ name: string } | null>(null);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    const [isLogin, setIsLogin] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(
        () => {
            // サーバーにログインしてるかきく
            axios
                .get("/api/me")
                .then((response) => {
                    //response.dataにはlaravelのme()が返したユーザー情報が入ってる
                    setIsAuthenticated(true);
                    setMe(response.data);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setMe(null);
                });
        },
        [], // 初回だけ実行
    );

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (error) {
            console.error("ログアウト失敗", error);
        } finally {
            setIsAuthenticated(false);
            setMe(null);
        }
    };

    const handleLoginSuccess = (user: User) => {
        setMe(user);
        setIsAuthenticated(true);
    };

    // 💡 重要：判定が終わる（nullじゃなくなる）までは、何も表示しない（またはローディング）
    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 font-bold">読み込み中...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light-gray flex flex-col">
            <Header
                onSwitchLogin={() => setIsLogin(true)}
                onSwitchRegister={() => setIsLogin(false)}
                isLogin={isLogin}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                userName={me?.name}
            />

            <main
                className={`flex-grow flex p-6 ${!isAuthenticated ? "items-center justify-center" : ""}`}
            >
                {isAuthenticated ? (
                    //ログイン成功 認証OK
                    <Dashboard />
                ) : isLogin ? (
                    //ログイン前 認証NG
                    <LoginForm
                        onSwitch={() => setIsLogin(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                ) : (
                    <RegisterForm
                        onSwitch={() => setIsLogin(true)}
                        onRegisterSuccess={handleLoginSuccess}
                    />
                )}
            </main>
        </div>
    );
}

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}