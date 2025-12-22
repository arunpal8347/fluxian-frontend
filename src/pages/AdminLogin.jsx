import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import API_BASE from "../config/api";
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;


function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Login failed");
      } else {
        // token save karo
        localStorage.setItem("fluxian-admin-token", data.token);
        navigate(`${ADMIN_PATH}/panel`);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ paddingTop: "4rem" }}>
      <div
        className="container"
        style={{
          maxWidth: "480px",
        }}
      >
        <div
          className="card"
          style={{ padding: "2rem" }}
        >
          <h1 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Admin Login
          </h1>
          <p
            className="section-subtitle"
            style={{ marginBottom: "1.5rem" }}
          >
            Only Fluxian owner/admin can access this area.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontWeight: 600 }}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  marginTop: "0.35rem",
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontWeight: 600 }}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  marginTop: "0.35rem",
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              />
            </div>

            {error && (
              <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                {error}
              </p>
            )}

            <Button type="submit" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
