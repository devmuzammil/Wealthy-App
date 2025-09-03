import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="w-full max-w-md p-6 sm:p-8">
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-xl p-6 sm:p-8 space-y-6">
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

                    {/* Title */}
                    <div className="text-center space-y-2">
                        <Heading label={"Sign in"} />
                        <SubHeading label={"Enter your credentials to access your account"} />
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <InputBox
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="you@example.com"
                            label={"Username"}
                        />
                        <PasswordInput
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            label={"Password"}
                        />
                    </div>

                    {/* Sign in Button */}
                    <div className="pt-2">
                        <Button
                            onClick={async () => {
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signin",
                                        {
                                            username,
                                            password,
                                        }
                                    );
                                    localStorage.setItem("token", response.data.token);
                                    navigate("/dashboard");
                                } catch (err) {
                                    localStorage.removeItem("token");
                                    alert(err?.response?.data?.message || "Signin failed. Check your credentials.");
                                }
                            }}
                            label={"Sign in"}
                        />
                    </div>

                    {/* Bottom Link */}
                    <BottomWarning
                        label={"Don't have an account?"}
                        buttonText={"Sign up"}
                        to={"/signup"}
                    />
                    <div className="text-center pt-2">
                        <a className="text-indigo-400 hover:underline" href="/forgot-password">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );

}