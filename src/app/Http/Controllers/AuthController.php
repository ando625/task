<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{

    // 新規会員登録
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Sanctumを使ってトークンを発行
        $token = $user->createToken('auth_token')->plainTextToken;

        // Reactに成功をJSONで返す
        return response()->json([
            'access_token' => $token,  //access_tokenというラベル名をつける
            'token_type' => 'Bearer',  //このBearer方式で
        ]);


    }
}
