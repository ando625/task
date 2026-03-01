<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    //共通の「持ち主チェック」
    //タスクの作成者IDと現在ログインしているユーザーのIDが一致するかの判定
    private function isOwner(User $user, Task $task):bool
    {
        return $user->id === $task->user_id;
    }

    //更新できるかどうかの判定
    public function update(User $user, Task $task):bool
    {
        return $this->isOwner($user,$task);

    }

    //削除できるかどうかの判定
    public function delete(User $user, Task $task):bool
    {
        return $this->isOwner($user,$task);
    }

    //新規作成はログインしていれば誰でもOK
    public function create(User $user):bool
    {
        return true;
    }


}
