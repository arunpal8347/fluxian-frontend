import { NavLink } from "react-router-dom";
import { useState } from "react";
import fluxianLogo from "../assets/fluxian-logo.png"; // yahan tumhara logo import

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Blog", to: "/blog" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="nav-logo">
        <img src={fluxianLogo} alt="Fluxian Logo" className="nav-logo-img" />
          <div className="nav-logo-text">
            <div className="nav-logo-title">Fluxian</div>
            <div className="nav-logo-subtitle">
              Smart Software. Simple Solutions.
            </div>
          </div>



        </NavLink>

        {/* DESKTOP NAV LINKS */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link-active" : undefined
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE — THEME TOGGLE + MOBILE TOGGLE */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? "☀" : "⏾"}
          </button>

          <button
            className="nav-toggle"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="container nav-mobile-menu">
          <nav>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
