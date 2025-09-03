export function Button({ label, onClick, variant = "primary", size = "md" }) {
    const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed";
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-3 text-base",
        lg: "px-6 py-3.5 text-lg"
    };
    const variants = {
        primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl hover:scale-[1.02]",
        secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700",
        outline: "bg-transparent text-indigo-400 border border-indigo-500/60 hover:bg-indigo-500/10"
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={`w-full ${base} ${sizes[size]} ${variants[variant]}`}
        >
            {label}
        </button>
    );
}
