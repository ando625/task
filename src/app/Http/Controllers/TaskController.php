<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use App\Models\User;


class TaskController extends Controller
{
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



    public function taskUpdate(TaskUpdateRequest $request, $id)
    {
        $validated = $request->validated();

        $task = auth()->user()->tasks()->find($id);

        if(!$task){
            return response()->json(['message' => 'タスクが見つかりません']);
        }


        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
        ]);

        return response()->json($task);

    }

    public function taskDestroy(Request $request,$id)
    {
        $task = auth()->user()->tasks()->find($id);

        if(!$task){
            return response()->json(['message' => 'タスクが見つかりません']);
        }

        $task->delete();

        return response()->json(['message' => 'タスクを削除しました']);

    }
}
