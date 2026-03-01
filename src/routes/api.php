<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



// ログイン中（Sanctum認証済み）のユーザーのみ許可
Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout', [AuthController::class, 'Logout']);

    Route::get('/me', [AuthController::class, 'me']);

    // タスク一覧表示
    Route::get('/tasks', [TaskController::class, 'index']);


    // タスク新規作成
    Route::post('/tasks', [TaskController::class, 'taskStore']);

    // タスク更新
    Route::put('/tasks/{task}', [TaskController::class, 'taskUpdate']);

    //タスク削除
    Route::delete('/tasks/{task}', [TaskController::class, 'taskDestroy']);

});