import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const useFetchHistory = () => {
    const [loading, setLoading] = useState(true);
    const [historyDetails, setHistoryDetails] = useState([]);

    const getHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/history", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const details = response.data?.history || [];
            setHistoryDetails(details);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getHistory();
    }, []);

    return {
        loading,
        historyDetails,
    };
};

export const HistoryComp = () => {
    const details = useFetchHistory();
    console.log(details);

    if (details.loading) {
        return (
            <div className="w-full col-span-5 flex justify-center items-center py-10">
                <p className="text-gray-400 animate-pulse text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full col-span-5 flex flex-col items-center px-5">
            <h1 className="text-2xl py-5 font-bold text-gray-100">Transaction History</h1>
            {details.historyDetails.length === 0 ? (
                <div className="w-full max-w-3xl p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center text-gray-400">
                    No transactions yet. Transfers will appear here instantly.
                </div>
            ) : (
                <div className="w-full max-w-3xl space-y-3">
                    {details.historyDetails.map((detail) => (
                        <div
                            key={detail._id}
                            className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition"
                        >
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-gray-100 text-lg">{detail.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {dayjs(detail.timestamp).format("MMM D, YYYY • h:mm A")}
                                </p>
                            </div>
                            <div
                                className={`text-lg font-bold ${detail.sent ? "text-emerald-400" : "text-rose-400"}`}
                            >
                                {detail.sent ? "+" : "-"}${detail.amount}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
