const API_URL = "http://localhost:8083/auth";

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.trim(),
            password: password,
        }),
    });

    const responseText = await response.text();

    if (!response.ok) {
        console.error("Login failed:", response.status, responseText);
        throw new Error(
            response.status === 401 || response.status === 403
                ? "Invalid username or password"
                : `Login failed: ${response.status}`
        );
    }

    localStorage.setItem("token", responseText);
    localStorage.setItem("username", username.trim());

    return responseText;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem("token"));
}

export function getUsername() {
    return localStorage.getItem("username");
}