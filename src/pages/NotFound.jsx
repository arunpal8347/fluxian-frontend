import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>

        <h2 style={styles.title}>Page not found</h2>

        <p style={styles.text}>
          Sorry, the page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link to="/" style={styles.button}>
          Go back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    padding: "20px",
  },
  card: {
    textAlign: "center",
    maxWidth: "420px",
    background: "#020617",
    borderRadius: "12px",
    padding: "40px 30px",
    boxShadow: "0 10px 40px rgba(197, 27, 27, 0.4)",
  },
  code: {
    fontSize: "96px",
    margin: "0",
    color: "#38bdf8",
    fontWeight: "700",
  },
  title: {
    fontSize: "24px",
    margin: "10px 0",
    color: "#f8fafc",
  },
  text: {
    fontSize: "15px",
    color: "#94a3b8",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: "8px",
    background: "#38bdf8",
    color: "#020617",
    fontWeight: "600",
    textDecoration: "none",
  },
};
