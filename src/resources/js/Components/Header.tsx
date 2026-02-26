// ヘッダーのバー

import React from "react";

export default function Header () {
    return (
        <header className="bg-main-navy text-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 bg-white rounded-full flex items-center justify-center text-main-navy font-bold">
                    L
                </div>
                <span className="font-bold text-xl">TASK</span>
            </div>
            <a
                href="/login"
                className="text-sm opacity-80 hover:opacity-100"
            >
                ログイン画面へ
            </a>
        </header>
    );
}

