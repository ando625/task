import React from "react";

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

export default function SubmitButton({ onClick, text }:Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full bg-main-navy text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition duration-300 shadow-lg"
        >
            {text}
        </button>
    );
}
