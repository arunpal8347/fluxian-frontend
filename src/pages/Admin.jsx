import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import API_BASE from "../config/api";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

function Admin() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");


  // ===== BLOG FORM STATE =====
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    status: "Draft",
  });

  const [editingBlog, setEditingBlog] = useState(null);

  const [enquiryFilter, setEnquiryFilter] = useState("All");
  const [enquirySort, setEnquirySort] = useState("newest");


  // ===== DATA STATE =====
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    status: "Coming Soon",
    domain: "",
  });



  // ===== AUTH + DATA FETCH =====
  useEffect(() => {
    const token = localStorage.getItem("fluxian-admin-token");

    if (!token) {
      navigate(`${ADMIN_PATH}/login`);
      return;
    }

    const fetchData = async () => {
      try {
        const [prodRes, blogRes, contactRes] = await Promise.all([
          fetch(`${API_BASE}/api/products`),
          fetch(`${API_BASE}/api/blog/admin`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_BASE}/api/contact`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const prodData = await prodRes.json();
        const blogData = await blogRes.json();
        const contactData = await contactRes.json();

        if (prodData.success) setProducts(prodData.data || []);
        if (blogData.success) setPosts(blogData.data || []);

        if (contactRes.status === 401 || !contactData.success) {
          localStorage.removeItem("fluxian-admin-token");
          navigate(`${ADMIN_PATH}/login`);
          return;
        } else {
          setContacts(contactData.data || []);
        }
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);


  const newCount = contacts.filter(c => c.status === "New").length;
  const contactedCount = contacts.filter(c => c.status === "Contacted").length;
  const closedCount = contacts.filter(c => c.status === "Closed").length;

  const liveProductsCount = products.filter(p => p.status === "Live").length;
  const draftBlogsCount = posts.filter(b => b.status === "Draft").length;


  // ===== STATS =====
  const stats = [
    {
      label: "New Enquiries",
      value: contacts.filter((c) => c.status === "New").length,
    },
    {
      label: "Contacted",
      value: contacts.filter((c) => c.status === "Contacted").length,
    },
    {
      label: "Closed",
      value: contacts.filter((c) => c.status === "Closed").length,
    },
    { label: "Products", value: products.length },
    { label: "Blogs", value: posts.length },
  ];


  // ===== LOGOUT =====
  const handleLogout = () => {
    localStorage.removeItem("fluxian-admin-token");
    navigate(`${ADMIN_PATH}/login`);
  };

  // ===== CREATE BLOG =====
  const handleCreateBlog = async () => {
    const token = localStorage.getItem("fluxian-admin-token");

    await fetch(`${API_BASE}/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBlog),
    });

    setShowBlogForm(false);
    window.location.reload();
  };

  // ===== DELETE BLOG =====
  const handleDeleteBlog = async (id) => {
    const token = localStorage.getItem("fluxian-admin-token");

    await fetch(`${API_BASE}/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.reload();
  };


  const filteredContacts = contacts
  .filter((c) =>
    enquiryFilter === "All" ? true : c.status === enquiryFilter
  )
  .sort((a, b) => {
    if (enquirySort === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });



  // ===== LOADING =====
  if (loading) {
    return (
      <section className="section" style={{ paddingTop: "4rem" }}>
        <p>Loading admin data...</p>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: "4rem" }}>
      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <h2 className="admin-sidebar-title">Fluxian Admin</h2>

          <nav className="admin-sidebar-nav">

            <button
              className={`admin-nav-item ${
                activeSection === "dashboard" ? "admin-nav-item-active" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={`admin-nav-item ${
                activeSection === "blogs" ? "admin-nav-item-active" : ""
              }`}
              onClick={() => setActiveSection("blogs")}
            >
              Blog Posts
            </button>

            <button
              className={`admin-nav-item ${
                activeSection === "products" ? "admin-nav-item-active" : ""
              }`}
              onClick={() => setActiveSection("products")}
            >
              Products
            </button>

            <button
              className={`admin-nav-item ${
                activeSection === "contacts" ? "admin-nav-item-active" : ""
              }`}
              onClick={() => setActiveSection("contacts")}
            >
              Enquiries
            </button>
          </nav>

          <div className="admin-sidebar-footer">
            <small>Internal panel for managing Fluxian content.</small>
            <br />
            <button
              onClick={handleLogout}
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8rem",
                borderRadius: "999px",
                padding: "0.3rem 0.8rem",
                border: "1px solid var(--color-border-soft)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="admin-main">
          {/* TOP BAR */}
          <div className="admin-topbar">
            <div>
             <h1 className="section-title">Overview</h1>


            </div>
          </div>

          <p style={{ opacity: 0.7, maxWidth: "600px", marginBottom: "1.5rem" }}>
            Welcome back. Here’s a quick overview and control panel for Fluxian.
          </p>


          {/* stats cards */}
          {activeSection === "dashboard" && (
            <div className="admin-stats-grid">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="card admin-stat-card"
                  style={{
                    borderLeft:
                      index === 0
                        ? "4px solid #1a73e8" // blue
                        : index === 1
                        ? "4px solid #fbbc04" // yellow
                        : index === 2
                        ? "4px solid #34a853" // green
                        : "4px solid #9aa0a6", // gray
                  }}
                >
                  <div className="admin-stat-label">{item.label}</div>
                  <div className="admin-stat-value">{item.value}</div>
                </div>
              ))}
            </div>
          )}



          {/* blog form + blog table */}
          {activeSection === "blogs" && (
            <>
              {/* BLOG FORM */}
              {showBlogForm && (
                <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
                  <h2>Add Blog Post</h2>

                  <div className="admin-form-group">
                    <label>Title</label>

                  <input
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, title: e.target.value })
                    }
                  />
                  <input
                    placeholder="Slug"
                    value={newBlog.slug}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, slug: e.target.value })
                    }
                  />
                  <input
                    placeholder="Category"
                    value={newBlog.category}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, category: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Excerpt"
                    value={newBlog.excerpt}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, excerpt: e.target.value })
                    }
                  />

                  <select
                    value={newBlog.status}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, status: e.target.value })
                    }
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>

                  <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                    <Button onClick={handleCreateBlog}>Save Blog</Button>
                    <Button variant="outline" onClick={() => setShowBlogForm(false)}>
                      Cancel
                    </Button>
                  </div>

                  </div>

                </div>
              )}

              {/* edit blog */}
              {editingBlog && (
                <div className="card" style={{ padding: "1.5rem", marginTop: "2rem" }}>
                  <h2>Edit Blog</h2>

                  <div className="admin-form-group">
                  <input
                    value={editingBlog.title}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, title: e.target.value })
                    }
                  />

                  <textarea
                    value={editingBlog.excerpt}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                    }
                  />

                  <select
                    value={editingBlog.status}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, status: e.target.value })
                    }
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  </div>
                  <Button
                    onClick={async () => {
                      const token = localStorage.getItem("fluxian-admin-token");

                      await fetch(
                        `${API_BASE}/api/blog/${editingBlog._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(editingBlog),
                        }
                      );

                      window.location.reload();
                    }}
                  >
                    Update Blog
                  </Button>
                  
                </div>
              )}


              {/* BLOG TABLE */}
              <div className="card admin-table-card">
                <div className="admin-table-header">
                  <h2>Blog Posts</h2>
                  <Button variant="outline" onClick={() => setShowBlogForm(true)}>
                    + New Blog Post
                  </Button>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id}>
                        <td>{post.title}</td>
                        <td>{post.category}</td>
                        <td>{post.status}</td>
                        <td>
                          <button onClick={() => setEditingBlog(post)}>Edit</button>
                          <button
                            style={{ color: "red", marginLeft: "0.5rem" }}
                            onClick={() => handleDeleteBlog(post._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* product create + product table       */}
          {activeSection === "products" && (
            <>
              {/* PRODUCTS TABLE */}
              <div className="card admin-table-card" style={{ marginTop: "2rem" }}>
                <div className="admin-table-header">
                  <h2>Products</h2>
                  <span className="admin-table-tag">SaaS Roadmap</span>
                  <Button variant="outline" onClick={() => setShowProductForm(true)}>
                      + New Product
                    </Button>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Domain</th>
                      <th>Action</th>
                    </tr>
                  

                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.status}</td>
                        <td>{product.domain || "—"}</td>
                        <td>
                          <button onClick={() => setEditingProduct(product)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* edit products */}
              {editingProduct && (
                <div className="card" style={{ padding: "1.5rem", marginTop: "2rem" }}>
                  <h2>Edit Product</h2>

                  <div className="admin-form-group">
                  <input value={editingProduct.name} disabled />

                  <select
                    value={editingProduct.status}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Coming Soon</option>
                    <option>In Planning</option>
                    <option>Live</option>
                  </select>

                  <input
                    placeholder="Domain (e.g. futureed.in)"
                    value={editingProduct.domain || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        domain: e.target.value,
                      })
                    }
                  />
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <Button
                      onClick={async () => {
                        const token = localStorage.getItem("fluxian-admin-token");

                        await fetch(
                          `${API_BASE}/api/products/${editingProduct._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(editingProduct),
                          }
                        );

                        window.location.reload();
                      }}
                    >
                      Update Product
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Product Create Form */}
              {showProductForm && (
                <div className="card" style={{ padding: "1.5rem", marginTop: "2rem" }}>
                  <h2>Add New Product</h2>

                  <div className="admin-form-group">
                    <label>Title</label>

                      <input
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                      />

                      <input
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, category: e.target.value })
                        }
                      />

                      <textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, description: e.target.value })
                        }
                      />

                      <select
                        value={newProduct.status}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, status: e.target.value })
                        }
                      >
                        <option>Coming Soon</option>
                        <option>In Planning</option>
                        <option>Live</option>
                      </select>

                      <div style={{ display: "flex", gap: "1rem" }}>
                        <Button
                          onClick={async () => {
                            const token = localStorage.getItem("fluxian-admin-token");

                            await fetch(`${API_BASE}/api/products`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify(newProduct),
                            });

                            window.location.reload();
                          }}
                        >
                          Save Product
                        </Button>

                        <Button variant="outline" onClick={() => setShowProductForm(false)}>
                          Cancel
                        </Button>
                      </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/*  contact enquiries table */}
          {activeSection === "contacts" && (
            <>
              <div className="card admin-table-card" style={{ marginTop: "2rem" }}>
                 

                 <div className="admin-table-header" style={{ flexWrap: "wrap", gap: "1rem" }}>
                  <h2>Contact Enquiries</h2>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <select
                      value={enquiryFilter}
                      onChange={(e) => setEnquiryFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <select
                      value={enquirySort}
                      onChange={(e) => setEnquirySort(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>


                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.phone || "—"}</td>
                        <td>{c.message}</td>
                        <td>
                          {/* STATUS BADGE (COLOR) */}
                          <span
                            className={`status-badge status-${c.status.toLowerCase()}`}
                            style={{ marginRight: "0.5rem" }}
                          >
                            {c.status}
                          </span>

                          {/* STATUS CHANGE DROPDOWN */}
                          <select
                            value={c.status}
                            onChange={async (e) => {
                              const token = localStorage.getItem("fluxian-admin-token");

                              await fetch(
                                `${API_BASE}/api/contact/${c._id}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({ status: e.target.value }),
                                }
                              );

                              window.location.reload();
                            }}
                          >
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Closed</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </main>
      </div>
    </section>
  );
}

export default Admin;
