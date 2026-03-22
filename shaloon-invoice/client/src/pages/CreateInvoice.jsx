import { useState, useEffect } from "react";
import api from "../api";
import jsPDF from "jspdf";
import { FaTrash, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import Receipt from "../components/Receipt";

function CreateInvoice() {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [cart, setCart] = useState([]);
  const [saving, setSaving] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    api
      .get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addService = (product) => {
    if (!product) {
      toast.error("Selected product not found");
      return;
    }

    const quantity = 1;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product._id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQuantity = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQuantity,
          total: existing.price * newQuantity
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity,
          total: product.price * quantity
        }
      ];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => cart.reduce((acc, item) => acc + item.total, 0);
  const subtotal = calculateSubtotal();
  const finalTotal = Math.max(subtotal - Number(discount || 0), 0);

  const handleGenerateInvoice = async () => {
    if (!customerName || cart.length === 0) {
      toast.error("Fill details first!");
      return;
    }

    const invoiceData = {
      customerName,
      customerMobile,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      discount: Number(discount || 0),
      paymentMode,
      totalAmount: finalTotal
    };

    try {
      setSaving(true);
      await api.post("/api/invoices/create", invoiceData);

      setReceiptData({
        customerName,
        customerMobile,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          total: item.total
        })),
        subtotal,
        discount: Number(discount || 0),
        finalTotal,
        paymentMode,
        date: new Date().toLocaleString()
      });

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("SHALOON INVOICE", 20, 20);
      doc.setFontSize(12);
      doc.text(`Customer: ${customerName}`, 20, 30);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30);

      let y = 50;
      doc.text("Item", 20, y);
      doc.text("Qty", 100, y);
      doc.text("Price", 130, y);
      doc.text("Total", 160, y);
      doc.line(20, y + 2, 190, y + 2);

      y += 10;
      cart.forEach(item => {
        doc.text(item.name, 20, y);
        doc.text(String(item.quantity), 100, y);
        doc.text(String(item.price), 130, y);
        doc.text(String(item.total), 160, y);
        y += 10;
      });

      doc.line(20, y, 190, y);
      doc.setFontSize(14);
      doc.text(`Subtotal: Rs. ${subtotal}`, 140, y + 10);
      doc.text(`Discount: Rs. ${Number(discount || 0)}`, 140, y + 18);
      doc.text(`Grand Total: Rs. ${finalTotal}`, 140, y + 26);

      doc.save(`${customerName}_invoice.pdf`);

      setCart([]);
      setCustomerName("");
      setCustomerMobile("");
      setDiscount(0);
      setPaymentMode("cash");
      toast.success("Invoice Saved!");
      setTimeout(() => window.print(), 300);
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to save invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="invoice-layout">
      <div className="invoice-column">
        <div className="card">
          <h2>Services</h2>
          {products.length === 0 && <p style={{ color: "#888" }}>No services available.</p>}
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #e2e8f0",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.2s"
              }}
              onClick={() => addService(product)}
            >
              <span>{product.name}</span>
              <strong>₹{product.price}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="invoice-column">
        <div className="card" style={{ height: "fit-content" }}>
          <h2>Invoice</h2>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Mobile number"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
            />
          </div>

          <h3>Added Services</h3>
          {cart.length === 0 ? (
            <p style={{ color: "#888" }}>No services added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.total}</td>
                    <td>
                      <button className="btn-danger" onClick={() => removeFromCart(index)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ marginTop: "20px" }}>
            <h4>Subtotal: ₹{subtotal}</h4>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <h3>Final Total: ₹{finalTotal}</h3>
          </div>

          <div className="form-group">
            <label>Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              <option value="cash">Cash</option>
              <option value="qr">QR</option>
            </select>
          </div>

          {paymentMode === "qr" && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", marginBottom: "8px" }}>Scan to pay</p>
              <div style={{ width: "150px", height: "150px", background: "#f1f5f9", borderRadius: "12px" }} />
            </div>
          )}

          <button
            className="btn-success full-width"
            onClick={handleGenerateInvoice}
            disabled={saving}
          >
            <FaDownload /> {saving ? "Processing..." : "Save & Download PDF"}
          </button>
          <button
            className="btn-primary full-width"
            style={{ marginTop: "10px" }}
            onClick={() => {
              if (cart.length === 0 && !receiptData) {
                toast.error("No items to print yet");
                return;
              }
              window.print();
            }}
          >
            Print Invoice
          </button>
        </div>
      </div>
      <Receipt
        invoice={
          receiptData || {
            customerName,
            customerMobile,
            items: cart.map(item => ({
              name: item.name,
              quantity: item.quantity,
              total: item.total
            })),
            subtotal,
            discount: Number(discount || 0),
            finalTotal,
            paymentMode,
            date: new Date().toLocaleString()
          }
        }
      />
    </div>
  );
}

export default CreateInvoice;