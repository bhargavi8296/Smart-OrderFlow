function RevenueChart({ orders = [] }) {
    const productMap = {};

    orders.forEach((order) => {
        const rawName =
            order.productName ||
            order.items?.[0]?.productName ||
            "Unknown";

        const productName = rawName
            .toLowerCase()
            .replace("iphones", "iphone")
            .replace("mobiles", "mobile")
            .trim();

        const displayName =
            productName.charAt(0).toUpperCase() + productName.slice(1);

        const quantity = Number(order.quantity || order.items?.[0]?.quantity || 0);
        const price = Number(order.price || order.items?.[0]?.price || 0);
        const revenue = Number(order.totalAmount || price * quantity || 0);

        if (!productMap[displayName]) {
            productMap[displayName] = {
                product: displayName,
                unitsSold: 0,
                revenue: 0,
            };
        }

        productMap[displayName].unitsSold += quantity;
        productMap[displayName].revenue += revenue;
    });

    const data = Object.values(productMap)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                        🏆 Top Products Analysis
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Ranked by revenue and units sold.
                    </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 px-4 py-3 rounded-2xl">
                    <p className="text-xs font-semibold text-indigo-500">
                        Total Revenue
                    </p>
                    <p className="font-bold text-indigo-700">
                        ₹{totalRevenue.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {data.length === 0 ? (
                <div className="h-56 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-500">
                    No product data available.
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((item, index) => {
                        const width = Math.round((item.revenue / maxRevenue) * 100);

                        return (
                            <div
                                key={item.product}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-slate-800">
                                            {index === 0
                                                ? "🥇"
                                                : index === 1
                                                    ? "🥈"
                                                    : index === 2
                                                        ? "🥉"
                                                        : "🏅"}{" "}
                                            {item.product}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {item.unitsSold} units sold
                                        </p>
                                    </div>

                                    <p className="font-extrabold text-slate-900">
                                        ₹{item.revenue.toLocaleString("en-IN")}
                                    </p>
                                </div>

                                <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-200">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                                        style={{ width: `${width}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default RevenueChart;