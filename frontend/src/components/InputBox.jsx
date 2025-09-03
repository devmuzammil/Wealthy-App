export function InputBox({ label, placeholder, onChange, value, readOnly = false }) {
    return (
        <div className="relative w-full my-3">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
                {label}
            </label>
            <input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                className={`w-full px-4 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm ${readOnly ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''}`}
            />
        </div>
    );
}
