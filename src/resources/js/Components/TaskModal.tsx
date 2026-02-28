import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Task } from "./TaskCard";


axios.defaults.withCredentials = true;


type Props = {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
    fetchTasks: () => Promise<void>;
};

type ValidationError = Record<string, string[]>;

export default function TaskModal({ isOpen, onClose, task, fetchTasks }: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task['status']>('todo');
    const [errors, setErrors] = useState<ValidationError>({});



    useEffect(() => {
        if (isOpen) {
            if (task) {
                //編集モード：選んだタスクの情報を入れる
                setTitle(task.title);
                setDescription(task.description || "");
                setStatus(task.status);  //編集時は今のステータスをセット
            } else {
                //新規作成モード：からにする
                setTitle("");
                setDescription("");
                setStatus('todo');  //新規作成はtodoスタート
            }
        }
    }, [task, isOpen]);

    if (!isOpen) return null;


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.get('/sanctum/csrf-cookie');

            const data = {
                title,
                description,
                status: status,
            };

            if (task) {
                await axios.put(`/api/tasks/${task.id}`, data);
            } else {
                await axios.post('/api/tasks', data);
            }

            //タスクを取得 APIのデータだけ更新する部分
            await fetchTasks();

            onClose();
        } catch (error:any) {
            if (error.response?.status === 422) {
                //laravelのバリデーションセット
                setErrors(error.response.data.errors as ValidationError);
            }
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* モーダル本体 */}
            <div
                className="bg-white w-full max-w-3xl rounded-2xl border border-gray-100 p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* モーダルを編集か新規制作かを切り替える */}
                <h2 className="text-gray-800 text-2xl font-bold mb-8 flex items-center gap-2">
                    <span className="text-blue-600">
                        {task ? "✏️編集" : "+新規作成"}
                    </span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-600 font-bold mb-2"></label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="何をする？"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-0.5 font-bold">
                                {errors.title[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            説明
                        </label>
                        <textarea
                            className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="詳しい内容を記入してください"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* ステータスボタン */}
                    <div>
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            進捗状況
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {(["todo", "doing", "review", "done"] as const).map(
                                (s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setStatus(s)}
                                        className={`py-3 px-2 rounded-xl border font-bold transition-all ${
                                            status === s
                                                ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                                                : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        {s === "todo" && "やること"}
                                        {s === "doing" && "進行中"}
                                        {s === "review" && "確認待ち"}
                                        {s === "done" && "完了"}
                                    </button>
                                ),
                            )}

                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 mt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-500 hover:text-gray-800 font-medium transition-colors"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            {task ? "更新" : "作成"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}