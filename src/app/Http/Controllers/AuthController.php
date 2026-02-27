<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;


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

        // Sanctumを使ってトークンを発行
        $token = $user->createToken('auth_token')->plainTextToken;

        // Reactに成功をJSONで返す
        return response()->json([
            'access_token' => $token,  //access_tokenというラベル名をつける
            'token_type' => 'Bearer',  //このBearer方式で
        ]);
    }

    // ログイン
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        // 認証チェック　ユーザーが見つからないまたはパスワードが一致しない
        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json([
                'message' => 'ログインに失敗しました。メールアドレスかパスワードが正しくありません。'
            ],401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);

    }
}
