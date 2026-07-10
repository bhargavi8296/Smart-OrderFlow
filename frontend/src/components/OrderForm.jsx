import { useEffect, useState } from "react";

function OrderForm({ addOrder, aiOrder }) {
    const [form, setForm] = useState({
        productName: "",
        quantity: "",
        price: "",
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (aiOrder && aiOrder.items && aiOrder.items.length > 0) {
            const item = aiOrder.items[0];

            setForm({
                productName: item.productName || "",
                quantity: item.quantity || "",
                price: item.price || "",
            });
        }
    }, [aiOrder]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await addOrder({
                productName: form.productName,
                quantity: Number(form.quantity),
                price: Number(form.price),
            });

            setForm({
                productName: "",
                quantity: "",
                price: "",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    Create New Order
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Add orders manually or auto-fill using AI Assistant
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 mt-6">
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={form.productName}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-60 transition"
                >
                    {saving ? "Creating Order..." : "Create Order"}
                </button>
            </form>
        </div>
    );
}

export default OrderForm;