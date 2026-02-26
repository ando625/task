import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header";
import RegisterForm from "./Components/RegisterForm";

// App
//  ├── Header.tsx
//  ├── RegisterForm.tsx
//  │     ├── InputField（名前）
//  │     ├── InputField（メール）
//  │     ├── InputField（パスワード）
//  │     └── SubmitButton.tsx
//  └── Layout（全体の枠）

export default function App(): JSX.Element{
    return (
        <div className="min-h-screen bg-bg-light-gray flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center p-6">
                <RegisterForm />
            </main>
        </div>
    );
}

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}