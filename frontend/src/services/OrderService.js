const API_URL = "http://localhost:8083/orders";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export async function getAllOrders() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch orders");
    }

    return response.json();
}

export async function createOrder(order) {
    const item = order.items?.[0];

    const payload = item
        ? {
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
        }
        : order;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create order");
    }

    return response.json();
}

export async function deleteOrder(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete order");
    }

    return response.text();
}