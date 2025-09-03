export function Balance({ balance }) {
    return (
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gray-900 border border-gray-800">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex items-center justify-between">
                <div>
                    <div className="text-gray-400 text-sm">Available Balance</div>
                    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        ${balance}
                    </div>
                </div>
                <div className="hidden md:block text-gray-400">USD</div>
            </div>
        </div>
    );
}
