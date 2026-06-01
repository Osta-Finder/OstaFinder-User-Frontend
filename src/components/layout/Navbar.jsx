import { NavLink, useLocation } from "react-router-dom";
import CuButton from "../ui/Button";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <div
      className={clsx(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-colors duration-300",
        isHome
          ? scrolled
            ? "bg-white/75 text-black backdrop-blur-md shadow-md"
            : "bg-transparent text-white"
          : "bg-white/75 text-black backdrop-blur-md shadow-md",
      )}
    >
      <NavLink to="/" className="flex items-center gap-2">
        <span className="hidden sm:inline-block text-lg font-semibold">Osta Finder</span>
        <img
          src="../../assets/images/logo.png"
          alt="logo"
          className="w-10 h-10 object-contain"
        />
      </NavLink>
      <div />

      {/* center links - absolutely centered to ensure visual center alignment */}
      <div className="absolute left-1/2 transform -translate-x-1/2 inset-y-0 flex items-center gap-6">
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            clsx("transition-colors", isActive && "font-semibold underline underline-offset-4", isActive ? "text-[var(--primary-color)]" : "")
          }
        >
          الفئات
        </NavLink>
        <NavLink
          to="/client-requests"
          className={({ isActive }) =>
            clsx("transition-colors", isActive && "font-semibold underline underline-offset-4", isActive ? "text-[var(--primary-color)]" : "")
          }
        >
          طلبات العميل
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            clsx("transition-colors", isActive && "font-semibold underline underline-offset-4", isActive ? "text-[var(--primary-color)]" : "")
          }
        >
          تواصل معنا
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            clsx("transition-colors", isActive && "font-semibold underline underline-offset-4", isActive ? "text-[var(--primary-color)]" : "")
          }
        >
          احنا مين؟
        </NavLink>
      </div>

      {/* right: auth links and logo */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/login"
          className={({ isActive }) => clsx("cursor-pointer", isActive && "underline underline-offset-4")}
        >
          <CuButton>تسجيل الدخول</CuButton>
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => clsx("cursor-pointer", isActive && "underline underline-offset-4")}
        >
          <CuButton>إنشاء حساب</CuButton>
        </NavLink>
      </div>
    </div>
  );
};

