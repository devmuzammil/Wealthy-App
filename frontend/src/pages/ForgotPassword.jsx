import { useState } from "react";
import axios from "axios";

export function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const requestCode = async () => {
        try {
            const resp = await axios.post("http://localhost:3000/api/v1/user/forgot-password", { username });
            setMessage(resp.data.message + (resp.data.code ? ` (DEV code: ${resp.data.code})` : ""));
            setError("");
            setStep(2);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to send reset code");
        }
    };

    const resetPassword = async () => {
        try {
            const resp = await axios.post("http://localhost:3000/api/v1/user/reset-password", { username, code, password });
            setMessage(resp.data.message);
            setError("");
            setStep(3);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
                <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                {message && <div className="text-green-400 mb-2">{message}</div>}
                {error && <div className="text-red-400 mb-2">{error}</div>}

                {step === 1 && (
                    <div className="space-y-4">
                        <input className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <button className="w-full py-2 rounded-xl bg-indigo-600" onClick={requestCode}>Send Code</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <input className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700" placeholder="Reset Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <input className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700" placeholder="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="w-full py-2 rounded-xl bg-indigo-600" onClick={resetPassword}>Reset Password</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <p>Password reset. You can now sign in.</p>
                        <a className="text-indigo-400 underline" href="/signin">Go to Sign in</a>
                    </div>
                )}
            </div>
        </div>
    );
}


