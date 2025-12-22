function About() {
  const values = [
    { icon: "💡", title: "Innovation", desc: "We build modern, scalable and future-ready software solutions." },
    { icon: "✨", title: "Simplicity", desc: "We create software that is powerful, yet simple to use." },
    { icon: "🔍", title: "Transparency", desc: "Clear communication and honest work at every stage." },
    { icon: "🛡️", title: "Reliability", desc: "Secure, stable and high-performance products you can trust." },
    { icon: "🤝", title: "Client First", desc: "Your goals are at the heart of every product we build." },
  ];

  return (
    <>

      {/* ABOUT */}
      <section className="section" style={{ paddingTop: "4rem" }}>
        <h1 className="section-title">About Fluxian</h1>

        <p
          className="section-subtitle"
          style={{ maxWidth: "700px", marginBottom: "2.5rem" }}
        >
          Fluxian is a modern IT company focused on building high-quality SaaS applications
          and ERP systems. We help schools, coaching centers and businesses transform
          their operations with smart, reliable technology.
        </p>
      </section>



      {/* MISSION & VISION */}
      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >

          {/* MISSION */}
          <div
            className="card"
            style={{ padding: "2rem" }}
          >
            <div style={{ fontSize: "2rem" }}>🎯</div>
            <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Our Mission</h2>
            <p style={{ opacity: 0.85 }}>
              To provide modern, scalable and affordable software solutions that
              solve real-world problems for institutions and businesses.
            </p>
          </div>

          {/* VISION */}
          <div
            className="card"
            style={{ padding: "2rem" }}
          >
            <div style={{ fontSize: "2rem" }}>🚀</div>
            <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Our Vision</h2>
            <p style={{ opacity: 0.85 }}>
              To become India’s leading SaaS development company with products
              that help thousands of institutions grow smarter every day.
            </p>
          </div>

        </div>
      </section>



      {/* VALUES */}
      <section className="section">
        <h2 className="section-title">Our Values</h2>

        <p
          style={{
            maxWidth: "650px",
            marginBottom: "2rem",
            opacity: 0.85,
          }}
        >
          Fluxian is built on a foundation of trust, innovation and long-term client success.
          These values shape every product we create.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {values.map((val, index) => (
            <div key={index} className="card" style={{ padding: "1.8rem" }}>
              <div style={{ fontSize: "2rem" }}>{val.icon}</div>
              <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                {val.title}
              </h3>
              <p style={{ opacity: 0.85 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

export default About;
