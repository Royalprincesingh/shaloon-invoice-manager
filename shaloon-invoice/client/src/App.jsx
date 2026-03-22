import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceList from "./pages/InvoiceList";
import Login from "./pages/Login";
import "./App.css";

const ProtectedRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      {token && (
        <nav className="navbar">
          <Link
            to="/"
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#6366f1", textDecoration: "none" }}
          >
            ✂️ Essenza Pro Unisex salon
          </Link>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/add-product">Services</Link>
            <Link to="/create-invoice">New Invoice</Link>
            <Link to="/invoices">History</Link>
            <button
              onClick={handleLogout}
              style={{ marginLeft: "20px", background: "#fee2e2", color: "#ef4444", padding: "8px 15px" }}
            >
              Logout
            </button>
          </div>
        </nav>
      )}

      <div className={token ? "container" : ""}>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute token={token}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute token={token}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-invoice"
            element={
              <ProtectedRoute token={token}>
                <CreateInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute token={token}>
                <InvoiceList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
