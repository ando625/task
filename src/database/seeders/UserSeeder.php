<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. 固定のテストユーザーを作成
        $user = User::create([
            'name' => '吉田正尚',
            'email' => 'yoshida@example.com',
            'password' => Hash::make('pass1234'),
        ]);

        // Factoryを使って、ユーザーIDだけ固定する
        Task::factory(10)->create([
            'user_id' => $user->id,
        ]);

        // 3. チームエリア確認用の別のユーザーも作っておく
        $otherUser = User::create([
            'name' => '山田一郎',
            'email' => 'yamada@example.com',
            'password' => Hash::make('pass1234'),
        ]);

        Task::factory(5)->create([
            'user_id' => $otherUser->id,
        ]);
    
    }
}
