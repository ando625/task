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

        $descriptions = [
            '今日の定例までに骨子をまとめておく。',
            '参考資料をデスクの引き出しから探して確認する。',
            '前回の修正漏れがないか、念入りにチェックが必要。',
            'これ終わったらチームリーダーにチャットで報告。',
            '午後から集中して一気に片付ける予定。',
            '細かい調整だけど、忘れると後で面倒なやつ。',
            '資料のバックアップを忘れずに取っておく。',
        ];


        return [
            'title' => fake()->randomElement($taskTitles),
            'description' => fake()->randomElement($descriptions),
            'status' => fake()->randomElement(['todo', 'doing', 'review', 'done']),
            'user_id' => \App\Models\User::factory(),

        ];
    }
}
