import React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import axios from "axios";


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

export default function App(): JSX.Element{

    const [isLogin, setIsLogin] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // サーバーにログインしてるかきく
        axios.get('/api/user')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    },
        // 初回だけ実行
        []);


    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            setIsAuthenticated(false);
        }catch(error){
            console.error("ログアウト失敗", error);
            setIsAuthenticated(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-bg-light-gray flex flex-col">
            <Header
                onSwitchLogin={() => setIsLogin(true)}
                onSwitchRegister={() => setIsLogin(false)}
                isLogin={isLogin}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
            />

            <main className={`flex-grow flex p-6 ${!isAuthenticated ? "items-center justify-center" : ""}`}>
                {isAuthenticated ? (
                    //ログイン成功 認証OK
                    <Dashboard />
                ) : (
                    isLogin ? (
                    //ログイン前 認証NG
                    <LoginForm
                        onSwitch={() => setIsLogin(false)}
                        onLoginSuccess={() => setIsAuthenticated(true)}
                    />
                ) : (
                    <RegisterForm 
                        onSwitch={() => setIsLogin(true)}
                        onRegisterSuccess={()=> setIsAuthenticated(true)}
                        />
                    )
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