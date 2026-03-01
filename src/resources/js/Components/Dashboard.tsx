//ログイン後の画面

import React from "react";
import TaskColumn from "./TaskColumen";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task, User } from "./TaskCard";
import TaskModal from "./TaskModal";
import axios from "axios";

export default function Dashboard() {

    // 自分の情報を入れる箱を追加
    const [me, setMe] = useState<User | null>(null);


    // 開閉用のスイッチ
    const [isModalOpen, setIsModalOpen] = useState(false);

    //編集用メモ帳 中身はタスクデータか新規作成の空(null)か
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // サーバーから届くタスクを並べるための箱
    const [tasks, setTasks] = useState<Task[]>([]);

    // タスクを持ってくる関数
    const fetchTasks = async () => {
        try {
            const [taskRes, meRes] = await Promise.all([
                axios.get('/api/tasks'),
                axios.get('/api/me')
            ]);                                               //サーバーにリクエストtaskちょうだい
            setTasks(taskRes. data);                          //事前作った箱に持ってきたdataをセット
            setMe(meRes.data);

        } catch (error) {
            console.error("タスクの取得に失敗しました", error);
        }
    };


    // 画面が表示されたタイミングでこの処理を実行(useEffect) task一覧をサーバから取ってくる 後の更新はその処理の中でfetchTasksしてその場所だけ変えるように指示する,基本画面一回取ってくるだけの処理がこれ 
    useEffect(() => {
        fetchTasks();
    }, []);

    const currentUserId = me?.id;

    //編集ボタンの処理 新規ではなく編集でのモーダルを開くため
    const handleEditClick = (task: Task) => {
        setEditingTask(task);  //編集データを準備して↓モーダルを開く
        setIsModalOpen(true);
    };

    //削除の処理
    const handleDeleteTask = async (id: number) => {
        //間違えて消さないように確認を入れる
        if (!window.confirm("タスクを削除しますか?")) return;

        try {
            // サーバーに削除依頼
            await axios.delete(`/api/tasks/${id}`);
            
            //削除後最新のリスト再取得
            await fetchTasks();

            alert("削除しました");
        } catch (error: any) {
            if (error.response?.status === 403) {
                alert("⚠️これはあなたのタスクではないため、削除できません");
            } else {
                console.error("削除に失敗しました", error);
                alert("削除に失敗しました");
            }
        }
    };


    return (
        // 上半分は自分のタスク(背景白)、下半分はチームのタスク(背景グレー)
        <div className="flex flex-col w-full max-w-[1400px] min-h-[calc(100vh-64px)] mx-auto border-t border-b border-gray-200">
            {/* 新規作成ボタン */}
            <div className="px-6 py-4 flex justify-between items-center bg-white border-b">
                <h2 className="text-xl font-bold text-main-navy">
                    自分のタスク
                </h2>
                <button
                    onClick={() => {
                        setEditingTask(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    タスク作成
                </button>
            </div>

            {/* 自分のタスク */}
            <div className="grid grid-cols-4 gap-0 p-6 flex-1 bg-white">
                <TaskColumn
                    title="やること"
                    tasks={tasks.filter(
                        (t) =>
                            t.status === "todo" && t.user_id === currentUserId,
                    )}
                    onEditTask={handleEditClick}
                    onDeleteTask={handleDeleteTask}
                />{" "}
                {/*filterでstatusがtodoのだけ持ってこれるように*/}
                <TaskColumn
                    title="進行中"
                    tasks={tasks.filter(
                        (t) =>
                            t.status === "doing" && t.user_id === currentUserId,
                    )}
                    onEditTask={handleEditClick}
                    onDeleteTask={handleDeleteTask}
                />
                <TaskColumn
                    title="レビュー/確認待ち"
                    tasks={tasks.filter(
                        (t) =>
                            t.status === "review" &&
                            t.user_id === currentUserId,
                    )}
                    onEditTask={handleEditClick}
                    onDeleteTask={handleDeleteTask}
                />
                <TaskColumn
                    title="完了"
                    tasks={tasks.filter(
                        (t) =>
                            t.status === "done" && t.user_id === currentUserId,
                    )}
                    onEditTask={handleEditClick}
                    onDeleteTask={handleDeleteTask}
                />
            </div>

            {/* チームタスクエリア全体を囲うグループ */}
            <div className="flex flex-col bg-slate-100 flex-1 pt-6">
                {/* 見出し：背景グレーの中に含める */}
                <div className="px-6 pt-6 pb-1">
                    <h3 className="font-bold text-gray-600 text-lg">チームタスク</h3>
                </div>

                {/* 4つの列：ここも背景グレー */}
                <div className="grid grid-cols-4 gap-0 pb-2 flex-1">
                    <TaskColumn
                        isTeamArea={true}
                        tasks={tasks.filter(
                            (t) =>
                                t.status === "todo" &&
                                t.user_id !== currentUserId,
                        )}
                    />
                    <TaskColumn
                        isTeamArea={true}
                        tasks={tasks.filter(
                            (t) =>
                                t.status === "doing" &&
                                t.user_id !== currentUserId,
                        )}
                    />
                    <TaskColumn
                        isTeamArea={true}
                        tasks={tasks.filter(
                            (t) =>
                                t.status === "review" &&
                                t.user_id !== currentUserId,
                        )}
                    />
                    <TaskColumn
                        isTeamArea={true}
                        tasks={tasks.filter(
                            (t) =>
                                t.status === "done" &&
                                t.user_id !== currentUserId,
                        )}
                    />
                </div>
            </div>

            {/* モーダル本体 */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={editingTask}
                fetchTasks={fetchTasks}
            />
        </div>
    );
}

