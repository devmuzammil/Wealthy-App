import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

export function PasswordInput({ label, placeholder, onChange, value }) {
    const location = useLocation();
    const path = location.pathname;
    const inputRef = useRef();

    const togglePasswordVisibility = () => {
        const input = inputRef.current;
        input.type = input.type === "password" ? "text" : "password";
    };

    return (
        <div className="relative w-full my-3">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
                {label}
            </label>
            <input
                ref={inputRef}
                type="password"
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
            />
            {path === "/body/update" && (
                <div className="pt-2">
                    <label className="text-sm text-gray-600">
                        <input
                            className="mr-2"
                            type="checkbox"
                            onClick={togglePasswordVisibility}
                        />
                        Show Password
                    </label>
                </div>
            )}
        </div>
    );
}
