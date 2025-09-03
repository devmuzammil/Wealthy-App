import React, { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import axios from "axios";
import { PasswordInput } from "./PasswordInput";

export const UpdateProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [res, setRes] = useState("");

    const getData = async () => {
        try {
            const userData = await axios.get("http://localhost:3000/api/v1/user/", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });

            setFirstName(userData.data.user.firstName);
            setLastName(userData.data.user.lastName);
            setUsername(userData.data.user.username);
        } catch (error) { }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="col-span-2 flex flex-col items-center px-6 py-10">
            <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Profile
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {res && <p className="text-green-500 text-center">{res}</p>}
                <div className="space-y-4">
                    <InputBox
                        onChange={() => {}}
                        value={firstName}
                        placeholder="John"
                        label={"First Name"}
                        readOnly={true}
                    />
                    <InputBox
                        onChange={() => {}}
                        value={lastName}
                        placeholder="Doe"
                        label={"Last Name"}
                        readOnly={true}
                    />
                    <InputBox
                        onChange={() => {}}
                        value={username}
                        placeholder="abc@gmail.com"
                        label={"Email"}
                        readOnly={true}
                    />
                    <PasswordInput
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        placeholder="New password"
                        label={"Change Password"}
                    />
                </div>
                <div className="mt-8">
                    <Button
                        onClick={async () => {
                            try {
                                if (!newPassword) {
                                    setError("Enter a new password to update");
                                    return;
                                }
                                const resp = await axios.put(
                                    "http://localhost:3000/api/v1/user/password",
                                    { password: newPassword },
                                    {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token"),
                                        },
                                    }
                                );
                                setRes(resp.data.message);
                                setError("");
                                setNewPassword("");
                            } catch (error) {
                                setError("Failed to update password");
                            }
                        }}
                        label={"Update Password"}
                    />
                </div>
            </div>
        </div>
    );
};
