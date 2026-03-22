function Receipt({ invoice }) {
  if (!invoice) return null;

  return (
    <div className="print-area">
      <h2 style={{ textAlign: "center", margin: 0 }}>Essenza Pro Unisex salon</h2>
      <p style={{ textAlign: "center", margin: "4px 0" }}>Main Market, City</p>
      <hr />

      <p>Customer: {invoice.customerName}</p>
      <p>Mobile: {invoice.customerMobile}</p>
      <p>Date: {invoice.date}</p>
      <hr />

      {invoice.items.map((item, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>₹{item.total}</span>
        </div>
      ))}

      <hr />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Subtotal</strong>
        <strong>₹{invoice.subtotal}</strong>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Discount</strong>
        <strong>₹{invoice.discount}</strong>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Total</strong>
        <strong>₹{invoice.finalTotal}</strong>
      </div>

      <hr />
      <p>Payment Mode: {invoice.paymentMode}</p>

      {invoice.paymentMode === "qr" && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <img src="/qr.png" alt="QR Code" width="120" />
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: "10px" }}>Thank You ❤️</p>
    </div>
  );
}

export default Receipt;