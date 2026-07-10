import { useState } from "react";
import { login } from "../services/authService";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await login(username, password);
            onLogin();
        } catch (error) {
            alert(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        AI
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 mt-5">
                        Smart OrderFlow
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to access your AI-powered dashboard
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-slate-700">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-60 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-xs text-slate-400 text-center mt-6">
                </p>
            </div>
        </div>
    );
}

export default Login;