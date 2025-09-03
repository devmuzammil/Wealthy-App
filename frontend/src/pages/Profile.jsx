import axios from "axios"
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Sidebar } from "../components/Sidebar"
import { UpdateProfile } from "../components/UpdateProfile"

export function Profile() {
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
    })

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

                {/* Profile Content */}
                <div className="col-span-5 p-8">
                    <div className="bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-transparent rounded-2xl p-8 shadow-lg border border-gray-800 hover:shadow-indigo-500/20 transition">
                        <UpdateProfile />
                    </div>
                </div>
            </div>
        </div>
    );

}