import { useEffect, useState } from "react";
import API_BASE from "../config/api";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    document.title = "Blog | Fluxian Insights";
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blog`);
        const data = await res.json();

        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: "4rem" }}>
        <p>Loading blog posts...</p>
      </section>
    );
  }


  return (
    <section className="section" style={{ paddingTop: "4rem" }}>
      <div className="section-header">
        <h1 className="section-title">Fluxian Blog</h1>
        <p
          className="section-subtitle"
          style={{ maxWidth: "700px", marginBottom: "2rem" }}
        >
          Articles and updates about SaaS, MERN development, ERP systems and
          the products we are building under Fluxian.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {posts.map((post) => (
          <article
            key={post._id}
            className="card"
            style={{
              padding: "1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "220px",
            }}
          >
            <div>
              <span className="badge">{post.category}</span>

              <h2 style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
                {post.title}
              </h2>

              <p style={{ opacity: 0.85 }}>{post.excerpt}</p>
            </div>

            <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              {post.readTime || "5 min read"}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
