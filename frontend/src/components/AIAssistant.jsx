import { useState } from "react";
import { toast } from "react-toastify";
import { generateOrder } from "../services/geminiService";

function AIAssistant({ onGenerateOrder }) {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.warning("Please enter an order description.");
            return;
        }

        try {
            setLoading(true);

            const result = await generateOrder(prompt);

            if (onGenerateOrder) {
                onGenerateOrder(result);
            }

            toast.success("AI order generated successfully!");
            setPrompt("");
        } catch (error) {
            console.error("AI Error:", error);
            toast.error(error.message || "AI order generation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">
                🤖 AI Order Assistant
            </h2>

            <p className="text-slate-500 text-sm mt-1">
                Generate orders with AI-powered risk analysis.
            </p>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create 500 iPhones worth 100 each"
                className="mt-5 w-full min-h-28 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-60 transition"
            >
                {loading ? "Analyzing..." : "Generate & Analyze Order"}
            </button>
        </div>
    );
}

export default AIAssistant;