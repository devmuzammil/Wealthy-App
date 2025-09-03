export function InputBox({ label, placeholder, onChange, value, readOnly = false }) {
    return (
        <div className="relative w-full my-3">
            <label className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs text-gray-400">
                {label}
            </label>
            <input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                className={`w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all ${readOnly ? 'opacity-80 cursor-not-allowed' : ''}`}
            />
        </div>
    );
}
