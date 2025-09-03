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
            <div className="w-full max-w-md p-8">
                <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow-xl p-8 space-y-6 hover:shadow-indigo-500/20 transition">

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
                    <div className="pt-4">
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