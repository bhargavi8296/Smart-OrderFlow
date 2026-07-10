function AIAnalysisCard({ analysis }) {
    const riskColor =
        analysis?.riskLevel === "High"
            ? "bg-red-100 text-red-700 border-red-200"
            : analysis?.riskLevel === "Medium"
                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                : "bg-green-100 text-green-700 border-green-200";

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">
                🧠 AI Risk Analysis
            </h2>

            {!analysis ? (
                <p className="text-slate-500 text-sm mt-4">
                    AI risk analysis will appear here.
                </p>
            ) : (
                <div className="mt-5">
                    <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${riskColor}`}>
                            {analysis.riskLevel} Risk
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                            {analysis.confidence}% Confidence
                        </span>
                    </div>

                    {analysis.warnings?.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {analysis.warnings.map((warning, index) => (
                                <div
                                    key={index}
                                    className="text-sm bg-red-50 border border-red-100 text-red-700 rounded-xl px-3 py-2"
                                >
                                    ⚠️ {warning}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-3 text-sm text-slate-700">
                        💡 {analysis.recommendation}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AIAnalysisCard;