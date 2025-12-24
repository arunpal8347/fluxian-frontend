import { useState, useEffect } from "react";
import Button from "../components/Button";
import API_BASE from "../config/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    document.title = "Contact Fluxian | Get in Touch";
  }, []);

  return (
    <section className="section" style={{ paddingTop: "4rem" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* LEFT SIDE - CONTACT INFO */}
        <div>
          <h1 className="section-title">Contact Fluxian</h1>
          <p
            className="section-subtitle"
            style={{ maxWidth: "500px", marginBottom: "2rem" }}
          >
            Have a project or want a demo of FutureEd? Get in touch with our
            team anytime.
          </p>

          <div
            style={{
              background: "var(--color-white)",
              padding: "1.8rem",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-soft)",
              border: "1px solid rgba(0,0,0,0.05)",
              lineHeight: "1.8",
            }}
          >
            <p>
              📩 <strong>Email:</strong> support@fluxian.in
            </p>
            <p>
              ⏱ <strong>Business Hours:</strong> 9 AM – 9 PM
            </p>
            <p>
              📍 <strong>Head Office:</strong> India (Remote)
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--color-white)",
            padding: "2rem",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-soft)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* NAME */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "600" }}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              style={{
                marginTop: "0.35rem",
                width: "100%",
                padding: "0.7rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.12)",
                outline: "none",
              }}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "600" }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              style={{
                marginTop: "0.35rem",
                width: "100%",
                padding: "0.7rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
          </div>

          {/* PHONE */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "600" }}>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              style={{
                marginTop: "0.35rem",
                width: "100%",
                padding: "0.7rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
          </div>

          {/* MESSAGE */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "600" }}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Please describe your query or requirement"
              style={{
                marginTop: "0.35rem",
                width: "100%",
                padding: "0.7rem",
                minHeight: "130px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
          </div>

          <Button type="submit" style={{ width: "100%" }}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>

          {/* SUCCESS / ERROR MESSAGE */}
          {status === "success" && (
            <p style={{ marginTop: "1rem", color: "green" }}>
              ✔ Thank you! Your message has been submitted successfully. Our
              team will contact you shortly.
            </p>
          )}
          {status === "error" && (
            <p style={{ marginTop: "1rem", color: "red" }}>
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* MOBILE RESPONSIVE FIX */}
      <style>{`
        @media (max-width: 768px) {
          .container {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
