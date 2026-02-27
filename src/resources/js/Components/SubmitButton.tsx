import React from "react";

interface Props {
    text: string;
}

export default function SubmitButton({ text }:Props) {
    return (
        <button
            type="submit"
            className="w-full bg-main-navy text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition duration-300 shadow-lg"
        >
            {text}
        </button>
    );
}
