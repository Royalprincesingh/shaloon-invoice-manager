import { useEffect, useState } from "react";
import api from "../api";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/invoices")
      .then((res) => setInvoices(res.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to load invoices");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>📜 Invoice History</h2>
      {error && <p style={{ color: "#EF4444" }}>{error}</p>}

      {loading ? (
        <p style={{ color: "#888" }}>Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <p style={{ color: "#888" }}>No invoices found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td>{inv.customerName}</td>
                <td>{inv.customerMobile}</td>
                <td>₹{inv.totalAmount}</td>
                <td>{new Date(inv.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvoiceList;