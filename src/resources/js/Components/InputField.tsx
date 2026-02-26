import React from "react";

interface Props{
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function InputField({ label, type, value, onChange, error }: Props) {
    return (
        <div className="mb-6 relative">
            <label className="block text-sm font-bold mb-2">{label}</label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none ${
                    error ? "border-red-500" : "border-gray-700"
                }`}
            />
            {/* --- ここでメッセージを表示 --- */}
            {error && (
                <p className="text-red-500 text-[10px] absolute left-1 top-[100%] mt-0.5 leading-none font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}