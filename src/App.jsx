import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path={`${ADMIN_PATH}/login`} element={<AdminLogin />} />
        <Route path={`${ADMIN_PATH}/panel`} element={<Admin />} />
        <Route path="*" element={<NotFound />} />


      </Routes>
    </Layout>
  );
}

export default App;
