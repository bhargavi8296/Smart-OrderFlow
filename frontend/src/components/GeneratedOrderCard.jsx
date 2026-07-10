function GeneratedOrderCard({ order }) {
    const item = order?.items?.[0];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">
                📦 Generated Order
            </h2>

            {!order || !item ? (
                <p className="text-slate-500 text-sm mt-4">
                    AI generated order will appear here.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                        <p className="text-slate-500">Customer</p>
                        <p className="font-semibold text-slate-800">
                            {order.customerName}
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                        <p className="text-slate-500">Product</p>
                        <p className="font-semibold text-slate-800">
                            {item.productName}
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                        <p className="text-slate-500">Quantity</p>
                        <p className="font-semibold text-slate-800">
                            {item.quantity}
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                        <p className="text-slate-500">Total</p>
                        <p className="font-semibold text-slate-800">
                            ₹{order.totalAmount}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GeneratedOrderCard;