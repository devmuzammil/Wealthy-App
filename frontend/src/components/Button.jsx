export function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl px-5 py-2.5 shadow-md hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
        >
            {label}
        </button>
    );
}
