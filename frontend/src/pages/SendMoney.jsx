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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="flex flex-col justify-center w-full max-w-md">
                <div className="bg-gradient-to-tr from-emerald-600/20 via-green-500/20 to-transparent rounded-2xl shadow-lg border border-gray-800 p-8 space-y-8 hover:shadow-green-500/20 transition">

                    {/* Title */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold">Send Money</h2>
                        <p className="text-gray-400 text-sm">Securely transfer funds in seconds</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-4 bg-gray-900/40 rounded-xl p-4 border border-gray-800">
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                            <span className="text-2xl font-semibold text-white">
                                {name[0].toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium text-gray-300"
                                htmlFor="amount"
                            >
                                Amount (in $)
                            </label>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white text-sm focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-500"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>

                        {/* Transfer Button */}
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
                            className="w-full rounded-xl text-base font-medium transition-all py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 focus:ring-4 focus:ring-green-500/50 shadow-md"
                        >
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}