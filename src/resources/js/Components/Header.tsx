// ヘッダーのバー

import React from "react";

type Props = {
    onSwitchLogin: () => void;
    onSwitchRegister: () => void;
    onLogout: () => void;
    isLogin: boolean;          //フォーム切り替え
    isAuthenticated: boolean;  //ログイン済みかどうか
    userName: string | undefined;
};

export default function Header ({onSwitchLogin, onSwitchRegister,isLogin, onLogout,isAuthenticated,userName}:Props) {
    return (
        <header className="bg-main-navy text-white p-4 pr-10 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 bg-white rounded-full flex items-center justify-center text-main-navy font-bold ml-8">
                    L
                </div>
                <span className="font-bold text-2xl tracking-widest">TASK</span>
            </div>

            <div>
                {isAuthenticated ? (
                    // ログイン済みなら
                    <div className="flex items-center justify-end gap-8">
                        <div>
                            👤<span className="ml-2 font-bold text-lg text-white">{userName}</span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors"
                        >
                            ログアウト
                        </button>
                    </div>
                ) : isLogin ? (
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

