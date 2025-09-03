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
            <Appbar letter={firstLetterOfName} />

            {/* Mobile Drawer Host */}
            <div className="md:hidden">
                <Sidebar inline={false} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="hidden md:block md:col-span-1 bg-gray-900 border-r border-gray-800 shadow-xl">
                    <Sidebar inline={true} />
                </div>

                <div className="md:col-span-5 p-4 md:p-8">
                    <div className="relative overflow-hidden bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-6 md:p-8">
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />
                        <UpdateProfile />
                    </div>
                </div>
            </div>
        </div>
    );

}