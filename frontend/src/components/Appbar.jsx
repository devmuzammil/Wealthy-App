import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export function Appbar({ letter }) {
    const navigate = useNavigate();

    return (
        <div className="h-16 px-6 flex justify-between items-center shadow-md bg-white/80 backdrop-blur-lg">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
            >
                <img className="w-8 h-8" src={logo} alt="logo" />
                <h1 className="text-xl font-extrabold tracking-wide text-gray-800">
                    Wealthly
                </h1>
            </div>
            <div className="flex items-center">
                <div className="rounded-full h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold shadow-lg">
                    {letter}
                </div>
            </div>
        </div>
    );
}
