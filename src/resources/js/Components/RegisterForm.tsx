import { FormEvent, useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { User } from "./TaskCard";

// 【一時的な避難所】外部ファイルを使わず、ここに直接書く！
export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

type ValidationErrors = Record<string, string[]>;

type Props = {
    onSwitch: () => void;
    onRegisterSuccess: (user:User) => void;
};

export default function RegisterForm({onSwitch, onRegisterSuccess}:Props) {
    // フォーム全体の状態（魔法のメモ帳）
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // エラーメッセージを保存するための
    const [errors, setErrors] = useState<ValidationErrors | null>(null);

    // 入力変更処理（どの項目が変わったか管理）
    const handleChange = (key: keyof RegisterFormData, value: string) => {
        setFormData({
            ...formData, // 既存のデータを全部コピー
            [key]: value, // 指定された項目だけ上書き
        });
    };

    // 登録ボタン押下時の処理（API通信）
    // 1. 関数の入り口で (e: React.MouseEvent) と正しく定義します
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        // e があることを確認してから、ブラウザの勝手な動きを止めます
        e.preventDefault();
        setErrors({});

        try {
            await axios.get("/sanctum/csrf-cookie");

            const response = await axios.post("/api/register", formData);

            alert("登録成功");

            // --- メモ帳をリセット ---
            setFormData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            onRegisterSuccess(response.data.user);
        } catch (error) {
            // 2. 「もしこれが Axios のエラーなら」という魔法の鑑定
            if (axios.isAxiosError(error)) {
                // 3. かつ、サーバーから 422 (バリデーションエラー) が返ってきたなら
                if (error.response?.status === 422) {
                    // error.response.data.errors の型を確定させてメモ帳に入れる
                    setErrors(
                        error.response.data.errors as Record<string, string[]>,
                    );
                } else {
                    alert("サーバー側でエラーが発生しました");
                }
            } else {
                // 4. 通信以前の問題（コードの間違いなど）
                alert("予期せぬエラーが発生しました");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-main-navy">
            <h2 className="text-2xl font-bold text-center mb-8">
                新規会員登録
            </h2>

            <form onSubmit={handleRegister}>
                <InputField
                    label="お名前"
                    type="text"
                    value={formData.name}
                    onChange={(value) => handleChange("name", value)}
                    error={errors?.name?.[0]}
                />

                <InputField
                    label="メールアドレス"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                    error={errors?.email?.[0]}
                />

                <InputField
                    label="パスワード"
                    type="password"
                    value={formData.password}
                    onChange={(value) => handleChange("password", value)}
                    error={errors?.password?.[0]}
                />

                <InputField
                    label="パスワード確認"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={(value) =>
                        handleChange("password_confirmation", value)
                    }
                    error={errors?.password_confirmation?.[0]}
                />

                <SubmitButton text="登録する" />
            </form>

            <div className="text-center">
                <button
                    onClick={onSwitch}
                    type="button"
                    className="text-sm text-main-navy hover:underline font-medium mt-7"
                >
                    ログインはこちら
                </button>
            </div>
        </div>
    );
}
