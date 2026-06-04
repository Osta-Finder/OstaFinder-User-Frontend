import { useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <Navbar />
      <div className={!isHome ? "pt-16" : ""}>{children}</div>
      <Footer />
    </>
  );
}
