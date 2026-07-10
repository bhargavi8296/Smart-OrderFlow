import { useState } from "react";

function OrdersTable({ orders, onDelete }) {
    const [search, setSearch] = useState("");

    const filteredOrders = orders.filter((order) =>
        order.productName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Recent Orders</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage all orders from your Spring Boot backend
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
                />
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-100 text-left text-slate-600">
                        <th className="p-4 rounded-l-xl">Order ID</th>
                        <th className="p-4">Product</th>
                        <th className="p-4">Quantity</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 rounded-r-xl">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 font-semibold text-slate-700">#{order.id}</td>
                            <td className="p-4 font-medium text-slate-800">{order.productName}</td>
                            <td className="p-4 text-slate-600">{order.quantity}</td>
                            <td className="p-4 font-semibold text-green-600">
                                ₹{Number(order.price).toLocaleString("en-IN")}
                            </td>
                            <td className="p-4">
                                <button
                                    onClick={() => onDelete(order.id)}
                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {filteredOrders.length === 0 && (
                        <tr>
                            <td colSpan="5" className="p-8 text-center text-slate-500">
                                No matching orders found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrdersTable;