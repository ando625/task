<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $taskTitles=[
            '企画書の作成',
            'クライアントとMTG',
            'バグの修正',
            'デザインの微調整',
            '経費精算',
            '進捗報告メール',
            'ランチ予約',
            'コードレビュー',
            'サーバー保守',
            'ドキュメント作成',
            '新規機能の調査',
            'デプロイ作業'
        ];


        return [
            'title' => fake()->randomElement($taskTitles),
            'description' => fake()->sentence(3). 'に関するタスクです',
            'status' => fake()->randomElement(['todo', 'doing', 'review', 'done']),
            'user_id' => \App\Models\User::factory(),

        ];
    }
}
