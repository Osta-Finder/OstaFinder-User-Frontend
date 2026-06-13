import { useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const hideFooter = pathname.startsWith("/create-order/");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`flex-1 ${!isHome ? "pt-16" : ""} flex flex-col`}>{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
}
