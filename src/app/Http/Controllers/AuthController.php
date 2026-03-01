<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    // 新規会員登録
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);


        Auth::login($user);

        // Reactに成功をJSONで返す
        return response()->json([
            'message' => 'ユーザー登録に成功しました',
            'user' => $user
        ]);
    }

    // ログイン
    public function login(LoginRequest $request)
    {
        //validated() で全データ（email, password, remember）を取得
        $data = $request->validated();

        // ログイン認証に使うのは email と password だけ
        // $data から email と password だけを抜き出す
        $credentials = [
            'email'    => $data['email'],
            'password' => $data['password'],
        ];

        // remember は「認証の第2引数」として使う（DBの検索には使わない）
        $remember = $request->boolean('remember');

        // ログイン試行
        // $credentials (emailとpassword) だけを使ってユーザーを探し、
        // 第2引数の $remember で「ログイン保持するかどうか」を決めます
        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'ログイン成功',
                'user' => Auth::user(),
            ]);
        }

        return response()->json(['message' => 'ログインに失敗しました'], 401);
    }


    // ログアウト
    public function Logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトしました']);

    }

    // ログイン中の自分のを取得
    public function me()
    {
        // 今ログインしてるユーザーを送る
        return response()->json(auth()->user());
    }
}
