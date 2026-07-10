function DashboardCards({ orders = [] }) {
    const getOrderAmount = (order) => {
        if (order.totalAmount) return Number(order.totalAmount);

        if (order.items?.length > 0) {
            return order.items.reduce(
                (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
                0
            );
        }

        return Number(order.price || 0) * Number(order.quantity || 0);
    };

    const getOrderQuantity = (order) => {
        if (order.items?.length > 0) {
            return order.items.reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0
            );
        }

        return Number(order.quantity || 0);
    };

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + getOrderAmount(order),
        0
    );

    const totalQuantity = orders.reduce(
        (sum, order) => sum + getOrderQuantity(order),
        0
    );

    const avgOrderValue =
        totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const cards = [
        {
            title: "Total Orders",
            value: totalOrders,
            subtitle: "Live from MySQL",
            gradient: "from-blue-600 to-indigo-600",
        },
        {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            subtitle: "Total order value",
            gradient: "from-emerald-500 to-teal-600",
        },
        {
            title: "Items Sold",
            value: totalQuantity,
            subtitle: "Total quantity sold",
            gradient: "from-amber-500 to-orange-600",
        },
        {
            title: "Avg Order Value",
            value: `₹${avgOrderValue.toLocaleString("en-IN")}`,
            subtitle: "Revenue per order",
            gradient: "from-purple-500 to-fuchsia-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-xl transition"
                >
                    <div
                        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${card.gradient} opacity-15`}
                    />

                    <p className="text-sm font-semibold text-slate-500">
                        {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                        {card.value}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        {card.subtitle}
                    </p>

                    <div
                        className={`mt-5 h-1.5 rounded-full bg-gradient-to-r ${card.gradient}`}
                    />
                </div>
            ))}
        </div>
    );
}

export default DashboardCards;