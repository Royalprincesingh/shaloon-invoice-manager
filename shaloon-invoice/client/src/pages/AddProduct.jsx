import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !price) {
      toast.error("Please fill name and price.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/products/add", {
        name,
        price: Number(price),
        stock: stock ? Number(stock) : 0
      });
      setName("");
      setPrice("");
      setStock("");
      toast.success("Product added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>➕ Add Service/Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Service Name</label>
          <input
            type="text"
            placeholder="Enter service name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Stock (optional)</label>
          <input
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
          />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;