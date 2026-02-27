//ログイン後の画面

import React from "react";
import TaskColumn from "./TaskColumen";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "./TaskCard";
import TaskModal from "./TaskModal";

export default function Dashboard() {

    // 開閉用のスイッチ
    const [isModalOpen, setIsModalOpen] = useState(false);

    //編集用メモ帳 中身はタスクデータか新規作成の空(null)か
    const [editingTask, setEditingTask] = useState<Task | null>(null);


    return (
        // 上半分は自分のタスク(背景白)、下半分はチームのタスク(背景グレー)
        <div className="flex flex-col w-full max-w-[1400px] min-h-[calc(100vh-64px)] mx-auto border-t border-b border-gray-200">
            {/* 新規作成ボタン */}
            <div className="px-6 py-4 flex justify-between items-center bg-white border-b">
                <h2 className="text-xl font-bold text-main-navy">
                    自分のタスク
                </h2>
                <button
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="bg-main-navy text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    タスク作成
                </button>
            </div>

            {/* 自分のタスク */}
            <div className="grid grid-cols-4 gap-0 p-6 flex-1 bg-white">
                <TaskColumn title="やること" />
                <TaskColumn title="進行中" />
                <TaskColumn title="レビュー/確認待ち" />
                <TaskColumn title="完了" />
            </div>

            {/* チームタスクエリア全体を囲うグループ */}
            <div className="flex flex-col bg-slate-100 flex-1">
                {/* 見出し：背景グレーの中に含める */}
                <div className="px-6 pt-6">
                    <h3 className="font-bold text-gray-600">チームタスク</h3>
                </div>

                {/* 4つの列：ここも背景グレー */}
                <div className="grid grid-cols-4 gap-0 p-6 flex-1">
                    <TaskColumn isTeamArea={true} />
                    <TaskColumn isTeamArea={true} />
                    <TaskColumn isTeamArea={true} />
                    <TaskColumn isTeamArea={true} />
                </div>
            </div>

            {/* モーダル本体 */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={editingTask}
            />
        </div>
    );
}

