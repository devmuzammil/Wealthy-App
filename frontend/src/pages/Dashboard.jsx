import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { Sidebar } from "../components/Sidebar"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [firstLetterOfName, setFirstLetterOfName] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                const roundedBalance = parseFloat(response.data.balance).toFixed(2);
                setBalance(roundedBalance);
                const fetchedName = response.data?.name || "";
                setName(fetchedName);
                const letter = fetchedName ? fetchedName.charAt(0).toUpperCase() : "";
                setFirstLetterOfName(letter);
            })
            .catch(() => {
                setBalance(0);
                setName("");
                setFirstLetterOfName("");
                navigate("/signin");
            })
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            {/* Top Appbar */}
            <Appbar letter={firstLetterOfName} />

            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1 bg-gray-900 border-r border-gray-800 shadow-xl">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="md:col-span-5 p-4 md:p-8 space-y-8">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-transparent rounded-2xl p-6 shadow-lg border border-gray-800 hover:shadow-indigo-500/20 transition">
                        <Balance balance={balance} />
                    </div>

                    {/* Users Section */}
                    <div className="bg-gradient-to-tr from-blue-600/20 via-cyan-600/20 to-transparent rounded-2xl p-6 shadow-lg border border-gray-800 hover:shadow-cyan-500/20 transition">
                        <Users name={name} />
                    </div>
                </div>
            </div>
        </div>
    );
}
