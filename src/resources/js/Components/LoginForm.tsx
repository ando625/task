import { FormEvent,useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import { User } from "./TaskCard";


export interface LoginFormData{
    email: string;
    password: string;
};

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

type ValidationErrors = Record<string, string[]>

type Props = {
    onSwitch: () => void;
    onLoginSuccess: (user:User) => void;
};


export default function LoginForm({ onSwitch, onLoginSuccess }: Props) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    // ログイン保持のON/OFFを管理する箱（変数）を追加
    const [remember, setRemember] = useState(false);

    const [errors, setErrors] = useState<ValidationErrors | null>(null);

    const handleChange = (name: keyof LoginFormData, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({}); //前のエラーを消す

        try {
            // 最初にクッキーをもらう
            await axios.get("/sanctum/csrf-cookie");

            // ログイン実行
            const response = await axios.post<{user:User}>(
                "/api/login",
                {
                    ...formData,
                    remember: remember,
                },
                {
                    headers: {
                        Accept: "application/json", // 💡「JSONで返事してね」と明示する
                        "X-Requested-With": "XMLHttpRequest",
                    },
                },
            );

            console.log("ログイン成功");

            // 成功した時だけリセット
            setFormData({ email: "", password: "" });

            // 画面を切り替える
            onLoginSuccess(response.data.user);
        } catch (error) {
            //  Axios のエラー?
            if (axios.isAxiosError(error)) {
                //かつ、サーバーから 422 (バリデーションエラー入力欄がから) が返ってきたなら
                if (error.response?.status === 422) {
                    // メールを入力してくださいなどのエラメッセージをそのままReactで表示
                    setErrors(error.response.data.errors);
                } else if (
                    //４０１の確認はパスワードが違うかどうかの確認
                    error.response?.status === 401
                ) {
                    const loginErrorMessage =
                        "メールアドレスまたはパスワードが正しくありません。";
                    setErrors({
                        email: [loginErrorMessage],
                        password: [loginErrorMessage],
                    });
                }
            } else {
                // 4. 通信以前の問題（コードの間違いなど）
                alert("予期せぬエラーが発生しました");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-main-navy">
            <h2 className="text-2xl font-bold text-center mb-8">ログイン</h2>
            <form onSubmit={handleLogin}>
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

                {/* チェックボックス */}
                <div className="flex items-center mb-6 mt-2">
                    <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-main-navy border-gray-300 rounded focus:ring-main-navy cursor-pointer"
                        checked={remember} // 箱の中身（trueかfalse）を反映
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
                    >
                        ログイン状態を保存する
                    </label>
                </div>
                <SubmitButton text="ログイン" />
            </form>

            <div className="text-center">
                <button
                    onClick={onSwitch}
                    type="button"
                    className="text-sm text-main-navy hover:underline font-medium mt-7"
                >
                    アカウントをお持ちでない方はこちら
                </button>
            </div>
        </div>
    );
}