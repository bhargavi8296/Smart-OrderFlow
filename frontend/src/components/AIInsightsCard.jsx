function AIInsightsCard({ orders }) {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
    );

    const productMap = {};

    orders.forEach((order) => {
        order.items?.forEach((item) => {
            productMap[item.productName] =
                (productMap[item.productName] || 0) + item.quantity;
        });
    });

    let topProduct = "N/A";
    let maxQty = 0;

    Object.entries(productMap).forEach(([product, qty]) => {
        if (qty > maxQty) {
            maxQty = qty;
            topProduct = product;
        }
    });

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl shadow-xl p-6 mt-8">
            <h2 className="text-2xl font-bold">
                🧠 AI Business Insights
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

                <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm opacity-80">Orders</p>
                    <h3 className="text-3xl font-bold">
                        {totalOrders}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm opacity-80">Revenue</p>
                    <h3 className="text-2xl font-bold">
                        ₹{totalRevenue.toLocaleString()}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm opacity-80">
                        Top Product
                    </p>

                    <h3 className="text-lg font-bold">
                        {topProduct}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm opacity-80">
                        AI Suggestion
                    </p>

                    <p className="text-sm mt-2">
                        {topProduct === "N/A"
                            ? "No orders yet."
                            : `Demand for ${topProduct} is increasing.`}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default AIInsightsCard;