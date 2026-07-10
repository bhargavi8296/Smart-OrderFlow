import { useEffect, useState } from "react";
import RevenueChart from "../components/RevenueChart";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";
import AIAssistant from "../components/AIAssistant";
import GeneratedOrderCard from "../components/GeneratedOrderCard";
import AIAnalysisCard from "../components/AIAnalysisCard";
import AIInsightsCard from "../components/AIInsightsCard";

import {
    getAllOrders,
    createOrder,
    deleteOrder,
} from "../services/orderService";

function Dashboard({ onLogout }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [aiOrder, setAiOrder] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Not able to fetch order from Backend.");
        } finally {
            setLoading(false);
        }
    };

    const addOrder = async (newOrder) => {
        try {
            await createOrder(newOrder);
            await fetchOrders();

            setAiOrder(null);
            setAiAnalysis(null);

            alert("Order created successfully!");
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Order not created.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        try {
            await deleteOrder(id);
            await fetchOrders();
            alert("Order deleted successfully!");
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Order not deleted.");
        }
    };

    const handleAIOrder = (result) => {
        setAiOrder(result.order || result);
        setAiAnalysis(result.analysis || null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
            <Navbar onLogout={onLogout} />

            <main className="max-w-7xl mx-auto px-8 py-8">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900">
                                Dashboard
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Manage orders, monitor revenue, and automate workflows with AI.
                            </p>
                        </div>

                        <div className="bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg">
                            Logged In
                        </div>
                    </div>

                    <DashboardCards orders={orders} />

                    <AIInsightsCard orders={orders} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-8">
                        <OrderForm addOrder={addOrder} aiOrder={aiOrder} />
                        <AIAssistant onGenerateOrder={handleAIOrder} />
                        <GeneratedOrderCard order={aiOrder} />
                        <AIAnalysisCard analysis={aiAnalysis} />
                    </div>
                    <RevenueChart orders={orders} />
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8 text-center text-slate-500">
                            Loading orders...
                        </div>
                    ) : (
                        <OrdersTable orders={orders} onDelete={handleDelete} />
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;