import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export function Appbar({ letter }) {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 z-30 h-16 px-4 md:px-6 flex justify-between items-center bg-gray-900/70 backdrop-blur-xl border-b border-gray-800">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <img className="w-8 h-8" src={logo} alt="logo" />
                <h1 className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Wealthly
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <button
                    aria-label="Open menu"
                    className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            const ev = new Event('toggle-mobile-nav');
                            window.dispatchEvent(ev);
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <div className="hidden md:flex text-sm text-gray-400">Welcome</div>
                <div className="rounded-full h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-lg">
                    {letter}
                </div>
            </div>
        </div>
    );
}
