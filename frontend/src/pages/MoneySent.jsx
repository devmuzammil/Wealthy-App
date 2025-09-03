import { useNavigate, useSearchParams } from "react-router-dom";
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            {/* Top Appbar */}
            <Appbar letter={firstLetterOfName} />

            {/* Layout */}
            <div className="grid grid-cols-6 gap-6">
                {/* Sidebar */}
                <div className="col-span-1 bg-gray-900 border-r border-gray-800 shadow-xl">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-span-5 flex items-center justify-center p-8">
                    <div className="bg-gradient-to-tr from-green-600/20 via-emerald-500/20 to-transparent rounded-2xl p-10 shadow-lg border border-gray-800 hover:shadow-green-500/20 transition w-full max-w-lg text-center space-y-6">

                        {/* Success Image */}
                        <img
                            src={doneImg}
                            alt="done-img"
                            className="h-24 w-24 mx-auto animate-bounce"
                        />

                        {/* Amount Sent */}
                        <h5 className="text-3xl font-bold tracking-wide text-white">
                            Amount Sent: <span className="text-green-400">${amount}</span>
                        </h5>

                        {/* Transaction Details */}
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Date: {date} <br /> Time: {time} <br /> Money Sent to{" "}
                            <span className="font-semibold text-white">{name}</span>
                        </p>

                        {/* Dashboard Button */}
                        <button
                            onClick={() => {
                                navigate("/dashboard");
                            }}
                            type="button"
                            className="w-full text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-green-500/50 font-medium rounded-xl text-base px-6 py-3 transition shadow-md"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
