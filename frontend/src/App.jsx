import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { isLoggedIn, logout } from "./services/authService";

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return loggedIn ? (
      <Dashboard onLogout={handleLogout} />
  ) : (
      <Login onLogin={handleLogin} />
  );
}

export default App;