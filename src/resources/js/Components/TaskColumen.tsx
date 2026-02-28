//看板ボードの列 「自分のタスク」「進行中」「レビュー待ち」「完了」という4つの縦の列です。

import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "./TaskCard";


type Props = {
    title?: string;
    tasks: Task[];
    isTeamArea?: boolean;
    onEditTask?: (task: Task) => void;
    onDeleteTask?: (id: number) => void;

}



export default function TaskColumn({title, tasks,isTeamArea, onEditTask, onDeleteTask}:Props) {
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


            <div className="flex flex-col gap-3">
                {tasks && tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description || ""}
                        status={task.status}
                        isMine={!isTeamArea} // チームエリアじゃなければ自分のタスク
                        showIcons={!isTeamArea}
                        userName={task.user?.name}
                        onEdit={() => onEditTask?.(task)}
                        onDelete={()=>onDeleteTask?.(task.id)}
                    />
                ))}
            </div>
        </div>
    );
}