import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  try {
    const stored = localStorage.getItem("fluxian-theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch (err) {
    console.error(err);
  }

  return "light";
}

function Layout({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // apply theme class + save to localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }

    try {
      localStorage.setItem("fluxian-theme", theme);
    } catch (err) {
      console.error(err);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
