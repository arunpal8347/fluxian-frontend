import { useEffect, useState } from "react";
import Button from "../components/Button";
import API_BASE from "../config/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Products fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: "4rem" }}>
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: "4rem" }}>
      <div className="section-header">
        <h1 className="section-title">Fluxian Products</h1>
        <p className="section-subtitle" style={{ maxWidth: "720px" }}>
          Fluxian builds independent SaaS products under separate domains.
          Below is our current product roadmap.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => {
          const isLive = product.status === "Live";
          const domainUrl =
            product.domain && product.domain !== "Not assigned"
              ? `https://${product.domain}`
              : null;

          return (
            <div
              key={product._id}
              className="card"
              style={{
                padding: "1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "230px",
              }}
            >
              <div>
                <span className="badge">{product.category}</span>

                <h2 style={{ margin: "0.5rem 0" }}>{product.name}</h2>

                <p style={{ opacity: 0.85 }}>{product.description}</p>

                {isLive && domainUrl && (
                  <div
                    style={{
                      marginTop: "0.75rem",
                      fontSize: "0.9rem",
                      opacity: 0.85,
                    }}
                  >
                    🌐{" "}
                    <a
                      href={domainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.domain}
                    </a>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1.2rem" }}>
                {isLive && domainUrl ? (
                  <Button
                    onClick={() => window.open(domainUrl, "_blank")}
                  >
                    Visit Website
                  </Button>
                ) : (
                  <Button disabled style={{ opacity: 0.7 }}>
                    {product.status === "In Planning"
                      ? "In Planning"
                      : "Website Coming Soon"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;
