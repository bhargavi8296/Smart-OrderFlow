import { getUsername } from "../services/authService";

function Navbar({ onLogout }) {
    const username = getUsername() || "User";

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        AI
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">
                            Smart OrderFlow
                        </h1>

                        <p className="text-sm text-slate-500">
                            AI-Powered Order Management Platform
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">

                    <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
                        ● Logged In
                    </span>

                    <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold border border-indigo-100">
                        Gemini AI Ready
                    </span>

                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">

                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                            {username.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                            {username}
                        </span>

                        <button
                            onClick={onLogout}
                            className="ml-2 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;