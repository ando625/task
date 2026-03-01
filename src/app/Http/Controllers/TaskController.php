<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $tasks = Task::with('user')->get();

        return response()->json($tasks);

    }


    public function taskStore(TaskStoreRequest $request)
    {

        $validated = $request->validated();

        $task = auth()->user()->tasks()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return response()->json($task);
    }



    public function taskUpdate(TaskUpdateRequest $request, Task $task)
    {
        // Policyでチェック
        $this->authorize('update', $task);

        $validated = $request->validated();


        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
        ]);

        return response()->json($task);

    }

    public function taskDestroy(Request $request,Task $task)
    {
        $this->authorize('delete',$task);


        $task->delete();

        return response()->json(['message' => 'タスクを削除しました']);

    }
}
