import { useNavigate, useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import doneImg from "../assets/verify.png";
import { Appbar } from "../components/Appbar";
import { Sidebar } from "../components/Sidebar";

export function MoneySent() {
    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount");
    const name = searchParams.get("name");

    const navigate = useNavigate();

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    const firstLetterOfName = name ? name.charAt(0).toUpperCase() : "U";

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <Appbar letter={firstLetterOfName} />

            {/* Mobile Drawer Host */}
            <div className="md:hidden">
                <Sidebar inline={false} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 pt-0">
                <div className="hidden md:block md:col-span-1 bg-gray-900 border-r border-gray-800 shadow-xl">
                    <Sidebar inline={true} />
                </div>

                <div className="md:col-span-5 flex items-start md:items-start justify-center p-4 md:p-8">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-8 md:p-10 shadow-xl w-full max-w-lg text-center space-y-6">
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-600/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />

                        <img src={doneImg} alt="done-img" className="h-24 w-24 mx-auto animate-bounce" />

                        <h5 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            ${amount}
                        </h5>
                        <p className="text-gray-300">Sent to <span className="font-semibold text-white">{name}</span></p>

                        <p className="text-gray-500 text-sm">{date} • {time}</p>

                        <div className="space-y-3 pt-2">
                            <button
                                onClick={() => navigate("/dashboard")}
                                type="button"
                                className="w-full text-white bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 font-medium rounded-xl text-base px-6 py-3 transition shadow-md"
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={() => navigate("/history")}
                                type="button"
                                className="w-full bg-transparent border border-gray-800 text-gray-300 hover:bg-gray-800/40 rounded-xl text-base px-6 py-3 transition"
                            >
                                View History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
