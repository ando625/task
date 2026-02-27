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
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if(Auth::attempt($validated)){
            $request->session()->regenerate();

            return response()->json([
                'message' => 'ログイン成功',
                'user' => Auth::user(),
            ]);
        }

        return response()->json(['message' => 'ログインに失敗しました'], 401);

    }

    public function Logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトしました']);

    }
}
