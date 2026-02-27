<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status'
    ];

    // やること        → todo
    // 進行中          → doing
    // レビュー/確認待ち → review
    // 完了            → done

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
