import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const [searchParams] = useSearchParams(); // to get access to query parameters, to send the money to the right person.
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4">
            <div className="flex flex-col justify-center w-full max-w-md">
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8 shadow-xl">
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-600/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />

                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Send Money</h2>
                        <p className="text-gray-400 text-sm">Securely transfer funds in seconds</p>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-900/40 rounded-xl p-4 border border-gray-800 mt-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                            <span className="text-2xl font-semibold text-white">
                                {name && name[0] ? name[0].toUpperCase() : "?"}
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-100">{name || "Unknown"}</h3>
                    </div>

                    <div className="space-y-3 mt-6">
                        <label className="text-sm text-gray-400" htmlFor="amount">Amount (USD)</label>
                        <div className="flex items-center gap-2">
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                min="0"
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-500"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <button
                            onClick={async () => {
                                try {
                                    await axios.post(
                                        "http://localhost:3000/api/v1/account/transfer",
                                        {
                                            to: id,
                                            amount: Number(amount),
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("token"),
                                            },
                                        }
                                    );
                                    navigate(`/money-sent?name=${name}&amount=${amount}`);
                                } catch (e) {
                                    alert(e?.response?.data?.message || "Transfer failed");
                                }
                            }}
                            className="w-full rounded-xl text-base font-medium transition-all py-3 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 focus:ring-4 focus:ring-emerald-500/40 shadow-md"
                        >
                            Initiate Transfer
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full rounded-xl text-base font-medium transition-all py-3 bg-transparent border border-gray-800 text-gray-300 hover:bg-gray-800/40"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}