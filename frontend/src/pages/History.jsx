import axios from "axios"
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Sidebar } from "../components/Sidebar"
import { HistoryComp } from "../components/HistoryComp"

export function History() {
    const [firstLetterOfName, setFirstLetterOfName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                const letter = response.data.name.charAt(0).toUpperCase();
                setFirstLetterOfName(letter);
            })
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            {/* Top Appbar */}
            <Appbar letter={firstLetterOfName} />

            <div className="grid grid-cols-1 md:grid-cols-6">
                {/* Sidebar */}
                <div className="md:col-span-1 border-r border-gray-800 min-h-screen bg-gray-900/50">
                    <Sidebar />
                </div>

                {/* History Section */}
                <div className="md:col-span-5 p-4 md:p-8">
                    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-purple-500/20 transition">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-100">
                            Transaction History
                        </h1>
                        <HistoryComp />
                    </div>
                </div>
            </div>
        </div>
    );

}