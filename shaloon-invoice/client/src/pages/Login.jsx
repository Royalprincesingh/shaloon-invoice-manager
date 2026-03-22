import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Welcome back, Boss!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              background: "#e0e7ff",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px"
            }}
          >
            <FaLock size={24} color="#4f46e5" />
          </div>
          <h2 style={{ margin: "10px 0" }}>Admin Portal</h2>
          <p className="subtitle">Please sign in to access dashboard.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Secret Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Secure Login"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "#94a3b8" }}>
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}

export default Login;