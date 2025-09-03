import axios from "axios";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="w-full max-w-md p-8">
                <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-8 space-y-6 hover:shadow-purple-500/20 transition">

                    {/* Title */}
                    <div className="text-center space-y-2">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an account"} />
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <InputBox
                            onChange={(e) => setFirstName(e.target.value)}
                            label={"First Name"}
                            placeholder={"John"}
                        />
                        <InputBox
                            onChange={(e) => setLastName(e.target.value)}
                            label={"Last Name"}
                            placeholder={"Doe"}
                        />
                        <InputBox
                            onChange={(e) => setUsername(e.target.value)}
                            label={"Email"}
                            placeholder={"john@gmail.com"}
                        />
                        <PasswordInput
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            label={"Password"}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                const response = await axios.post(
                                    "http://localhost:3000/api/v1/user/signup",
                                    {
                                        username,
                                        password,
                                        firstName,
                                        lastName,
                                    }
                                );
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            }}
                            label={"Sign Up"}
                        />
                    </div>

                    {/* Bottom Link */}
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Sign in"}
                        to={"/signin"}
                    />
                    <div className="text-center pt-2">
                        <a className="text-indigo-400 hover:underline" href="/forgot-password">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );

}