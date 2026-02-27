import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";

// App
//  ├── Header.tsx
//  ├── RegisterForm.tsx
//  │     ├── InputField（名前）
//  │     ├── InputField（メール）
//  │     ├── InputField（パスワード）
//  │     └── SubmitButton.tsx
//  ├── LoginForm.tsx
//  |
//  └── Layout（全体の枠）


export default function App(): JSX.Element{

    const [isLogin, setIsLogin] = useState(true);

    
    return (
        <div className="min-h-screen bg-bg-light-gray flex flex-col">
            <Header
                onSwitchLogin={() => setIsLogin(true)}
                onSwitchRegister={() => setIsLogin(false)}
                isLogin={isLogin}
            />

            <main className="flex-grow flex items-center justify-center p-6">
                {isLogin ? (
                    <LoginForm onSwitch={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitch={() => setIsLogin(true)} />
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