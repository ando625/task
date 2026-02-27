import { FormEvent,useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import SubmitButton from "./SubmitButton";


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
};


export default function LoginForm({ onSwitch }: Props) {

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<ValidationErrors | null>(null);

    const handleChange = (name: keyof LoginFormData, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});   //前のエラーを消す


        try {
            const response = await axios.post<AuthResponse>(
                "/api/login",
                formData,
                { headers: { Accept: "application/json" } },
            );

            // トークンを保存
            localStorage.setItem("access_token", response.data.access_token);

            console.log("ログイン成功", response.data.user);

            // 成功した時だけリセット
            setFormData({ email: "", password: "" });

            // 画面を切り替える




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
                <SubmitButton  text="ログイン" />
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