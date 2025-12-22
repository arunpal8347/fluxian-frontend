import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero-animation.json";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();
  const testimonials = [
    {
      name: "School Admin (Beta User)",
      role: "Education Institution",
      text: "Fluxian understood our requirements clearly. The upcoming ERP looks simple and powerful for daily use.",
    },
    {
      name: "Coaching Owner",
      role: "Early Discussion",
      text: "We were looking for an easy way to manage attendance and fees. Fluxian’s upcoming solution looks promising.",
    },
    {
      name: "Future Client",
      role: "Your School / Business",
      text: "We’re onboarding new institutions soon. Your success story can be the next one here.",
    },
  ];

  return (
    <>
      {/* ANIMATED HERO SECTION */}
      <section
        className="section"
        style={{
          paddingTop: "4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* LEFT CONTENT */}
        <div
          style={{
            animation: "fadeInLeft 1s ease forwards",
            opacity: 0,
          }}
        >
          <h1
            style={{
              fontSize: "2.6rem",
              marginBottom: "1rem",
              lineHeight: "1.2",
              color: "var(--color-dark-navy)",
            }}
          >
            Build Modern Software
            <br />
            with Fluxian
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "520px",
              opacity: 0.85,
              marginBottom: "1.8rem",
            }}
          >
            We create scalable SaaS applications, ERP systems, and custom web
            solutions that help schools and businesses run smarter.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button onClick={() => navigate("/services")}>
              Explore Our Services
            </Button>
            <Button variant="outline" onClick={() => navigate("/products")}>
              View Upcoming Products
            </Button>
          </div>
        </div>

        {/* RIGHT — LOTTIE ANIMATION */}
        <div
          style={{
            animation: "fadeInRight 1s ease forwards",
            opacity: 0,
          }}
        >
          <Lottie animationData={heroAnimation} loop={true} />
        </div>
      </section>

      {/* WHAT FLUXIAN DOES */}
      <section className="section">
        <h2 className="section-title">What Fluxian Does</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <div className="card">
            <h3>SaaS Development</h3>
            <p>
              We build cloud-based SaaS products with secure, reliable, and
              scalable architecture.
            </p>
          </div>

          <div className="card">
            <h3>Custom Web Apps (MERN)</h3>
            <p>
              Modern, fast, and powerful web applications designed exactly for
              your business needs.
            </p>
          </div>

          <div className="card">
            <h3>School ERP (Coming Soon)</h3>
            <p>
              A complete school management ERP is under development — focused on
              attendance, fees, teachers and parents in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE FLUXIAN */}
      <section className="section">
        <h2 className="section-title">Why Choose Fluxian?</h2>

        <ul
          style={{
            marginTop: "1rem",
            lineHeight: "1.8",
            fontSize: "1.05rem",
          }}
        >
          <li>✔ Fast delivery with clean, maintainable code</li>
          <li>✔ Modern UI & optimized performance</li>
          <li>✔ Secure backend architecture</li>
          <li>✔ Affordable pricing</li>
          <li>✔ 24/7 support (as per project scope)</li>
          <li>✔ Scalable systems ready for growth</li>
        </ul>
      </section>

      {/* TESTIMONIALS SECTION (PLACEHOLDER STYLE) */}
      <section className="section">
        <h2 className="section-title">What Our Clients Say</h2>
        <p
          className="section-subtitle"
          style={{ maxWidth: "620px", marginBottom: "2rem" }}
        >
          We’re in early stages of launching our products. Here’s how people
          feel after discussing their requirements with us.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: "1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "210px",
              }}
            >
              <p style={{ opacity: 0.85, marginBottom: "1.2rem" }}>
                “{t.text}”
              </p>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: "0.2rem",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.8,
                    marginBottom: "0.3rem",
                  }}
                >
                  {t.role}
                </div>
                <div style={{ fontSize: "0.9rem" }}>⭐️⭐️⭐️⭐️⭐️</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GENERIC PRODUCT CTA */}
      <section
        className="section"
        style={{
          background: "var(--color-white)",
          padding: "3rem",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-soft)",
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h2 className="section-title">SaaS Products Under Fluxian</h2>

        <p
          style={{
            maxWidth: "620px",
            margin: "0 auto 1.5rem",
            opacity: 0.85,
          }}
        >
          Fluxian will soon launch multiple SaaS products — starting with a
          School ERP, followed by hotel management and business CRM solutions.
        </p>

        <Button onClick={() => navigate("/products")}>View All Products</Button>
      </section>

      {/* LOCAL STYLES FOR ANIMATION + RESPONSIVE HERO */}
      <style>
        {`
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @media (max-width: 768px) {
            .section:nth-of-type(1) {
              grid-template-columns: 1fr !important;
              text-align: center;
            }

            .section:nth-of-type(1) > div:nth-child(1) {
              order: 2;
            }
            .section:nth-of-type(1) > div:nth-child(2) {
              order: 1;
            }
          }
        `}
      </style>
    </>
  );
}

export default Home;
