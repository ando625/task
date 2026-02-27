// ヘッダーのバー

import React from "react";

type Props = {
    onSwitchLogin: () => void;
    onSwitchRegister: () => void;
    isLogin: boolean;
};

export default function Header ({onSwitchLogin, onSwitchRegister,isLogin}:Props) {
    return (
        <header className="bg-main-navy text-white p-4 pr-10 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 bg-white rounded-full flex items-center justify-center text-main-navy font-bold">
                    L
                </div>
                <span className="font-bold text-xl">TASK</span>
            </div>

            <div className="mr-5">
                {isLogin ? (
                    <button onClick={onSwitchRegister}>
                        新規会員登録はこちら
                    </button>
                ) : (
                    <button onClick={onSwitchLogin}>ログイン画面へ</button>
                )}
            </div>
        </header>
    );
}

