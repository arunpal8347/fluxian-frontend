function Services() {
  const services = [
    {
      title: "Custom Web App Development (MERN)",
      description:
        "We build high-performance MERN applications with dashboards, authentication, admin panels, and APIs.",
      icon: "💻",
    },
    {
      title: "School & Coaching ERP Solutions",
      description:
        "Attendance, fees, exams, timetable, teachers, parents — complete ERP modules for institutions.",
      icon: "🏫",
    },
    {
      title: "SaaS Product Development",
      description:
        "We create clean, secure, scalable SaaS products built for recurring monthly revenue.",
      icon: "☁️",
    },
    {
      title: "API & Backend Development",
      description:
        "Fast, secure, and optimized Node.js APIs with JWT authentication and role-based access.",
      icon: "🔐",
    },
    {
      title: "Website & Landing Page Development",
      description:
        "Professional websites, portfolio pages, and high-converting landing pages for startups.",
      icon: "🌐",
    },
    {
      title: "Cloud Setup & Deployment",
      description:
        "We deploy apps seamlessly on AWS, DigitalOcean, Vercel, Hostinger & more.",
      icon: "🚀",
    },
    {
      title: "Monthly Maintenance & Support",
      description:
        "Bug fixes, updates, backups, monitoring & performance optimization every month.",
      icon: "🛠️",
    },
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">
          Modern, scalable and business-focused development solutions for schools,
          startups, institutes and enterprises.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="card"
            style={{
              padding: "1.8rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              {service.icon}
            </div>

            <h3 style={{ marginBottom: "0.6rem" }}>{service.title}</h3>

            <p style={{ opacity: 0.85 }}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
