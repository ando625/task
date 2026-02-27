import React from "react";
import TaskCard from "./TaskCard";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Task } from "./TaskCard";


axios.defaults.withCredentials = true;


type Props = {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
};

export default function TaskModal({ isOpen, onClose, task }: Props) {
    if (!isOpen) return null;

    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie');

            const data = {
                title,
                description,
                status: task ? task.status : 'todo',
            };

            if (task) {
                await axios.put(`/api/tasks/${task.id}`, data);
            } else {
                await axios.post('/api/tasks', data);
            }

            onClose();
        } catch (error) {
            console.error("保存に失敗しました", error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* モーダル本体 */}
            <div
                className="bg-white w-full max-w-xl rounded-2xl border border-gray-100 p-8 shadow-2xl"
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