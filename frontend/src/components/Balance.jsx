export function Balance({ balance }) {
    return (
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-5 shadow-lg">
            <div className="font-medium text-lg">Your Balance</div>
            <div className="font-bold text-2xl tracking-wide">$ {balance}</div>
        </div>
    );
}
