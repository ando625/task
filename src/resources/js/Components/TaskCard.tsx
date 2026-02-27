//タスクカード 青いカード グレーのカード タスク名、内容、編集ボタン（鉛筆）、削除ボタン（ゴミ箱）を配置します

import React from "react";

// ユーザーの型
export type User = {
    id: number;
    name: string;
    email: string;
};

// タスクの型
export type Task = {
    id: number;
    user_id: number;
    title: string;
    description: string | null; // NULL（空っぽ）もありえるよ
    status: 'todo' | 'doing' |' review'| 'done'; 
    created_at: string;
    user?: User; // 誰が作ったかの情報も一緒にくっつけられるようにする
};

type Props = {
    title: string;
    description: string;
    status:'todo'|'doing'|'review'| 'done';
    isMine: boolean;
    showIcons: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function TaskCard({ title, description, status, isMine, showIcons, onEdit, onDelete }: Props) {

    const statusLabels = {
        todo: "やること",
        doing: "進行中",
        review: "確認待ち",
        down: "完了"
    };
    

    return (
        <div className={`p-4 rounded-lg shadow-sm border-l-4 mb-3 ${isMine ? "bg-card-blue border-blue-500" : "bg-gray-300 border-gray-500"}`}>
            <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
            <p className="text-xs text-gray-600 mb-4 line-clamp-2">{description}</p>


            {/* 自分のカードの時だけ編集削除ボタンを出す */}
            {isMine && (
                <div className="flex justify-end gap-2">
                    <button className="">
                        ✏️
                    </button>
                    <button>
                        🗑️
                    </button>
                </div>
            )}
        </div>
        
    )
}