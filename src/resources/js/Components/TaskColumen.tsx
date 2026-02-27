//看板ボードの列 「自分のタスク」「進行中」「レビュー待ち」「完了」という4つの縦の列です。

import React from "react";

type Props = {
    title?: string;
    isTeamArea?: boolean;
}



export default function TaskColumn({title, isTeamArea}:Props) {
    return (
        <div
            className={`
            p-4 border-l border-r border-gray-200 h-full
            ${isTeamArea ? "bg-slate-100" : "bg-white"}
        `}
        >
            {title && (
                <h3 className="font-bold text-gray-700 mb-4 px-2 border-b-2 border-main-navy/20 pb-2 text-center">
                    {title}
                </h3>
            )}

            <div className="space-y-3">{/* カードを後で並べる */}</div>
        </div>
    );
}