import { Link } from "react-router-dom";
import { FaPlusCircle, FaFileInvoice } from "react-icons/fa";

function Dashboard() {
  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#6366f1" }}>Welcome to Essenza Pro Unisex salon</h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>Manage your salon like a premium .</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/create-invoice" style={{ textDecoration: "none" }}>
          <div className="card" style={{ width: "220px", cursor: "pointer", textAlign: "center" }}>
            <FaPlusCircle size={40} color="#6366f1" />
            <h3>New Invoice</h3>
            <p>Create bill for customer</p>
          </div>
        </Link>

        <Link to="/invoices" style={{ textDecoration: "none" }}>
          <div className="card" style={{ width: "220px", cursor: "pointer", textAlign: "center" }}>
            <FaFileInvoice size={40} color="#10b981" />
            <h3>History</h3>
            <p>Check old records</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;