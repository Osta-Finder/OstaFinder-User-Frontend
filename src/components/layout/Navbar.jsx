import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CuButton from "../ui/Button";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/authApi";
import { useGetMeQuery } from "./../../services/authApi";

import clsx from "clsx";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("loggedIN") === "true";
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownDesktopRef = useRef(null);
  const dropdownMobileRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const avatarLetter = user?.name?.charAt(0) || "U";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isOutsideDesktop = dropdownDesktopRef.current && !dropdownDesktopRef.current.contains(e.target);
      const isOutsideMobile = dropdownMobileRef.current && !dropdownMobileRef.current.contains(e.target);
      if (isOutsideDesktop && isOutsideMobile) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate("/");
  };

  const navLinks = [
    ...(user?.role !== "worker"
      ? [{ to: "/categories", label: "الفئات" }]
      : []),
    { to: "/contact-us", label: "تواصل معنا" },
    { to: "/about-us", label: "احنا مين؟" },
  ];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:py-4 transition-colors duration-300",
          isHome
            ? scrolled
              ? "bg-white/75 text-black backdrop-blur-md shadow-md"
              : "bg-transparent text-white"
            : "bg-white/75 text-black backdrop-blur-md shadow-md",
        )}
      >
        <NavLink
          to={user?.role === "worker" ? "/worker/dashboard" : "/"}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="inline-block text-sm sm:text-lg font-semibold whitespace-nowrap">
            Osta Finder
          </span>
          <img src={logo} alt="logo" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
        </NavLink>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "transition-colors whitespace-nowrap",
                  isActive && "font-semibold underline underline-offset-4",
                  isActive ? "text-[var(--primary-color)]" : "",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop auth section */}
        <div className="hidden md:flex items-center gap-4">
          {!meLoading && isAuthenticated ? (
            <div className="relative" ref={dropdownDesktopRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name || "User"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                    {avatarLetter}
                  </div>
                )}
                <span className="text-sm font-medium max-w-[100px] truncate">
                  {user?.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {user?.role === "worker" ? (
                    <>
                      <NavLink to="/worker/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">لوحة التحكم</NavLink>
                      <NavLink to="/worker/requests" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">إدارة الطلبات</NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/account-profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">الملف الشخصي</NavLink>
                      <NavLink to="/client-requests" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">طلبات العميل</NavLink>
                    </>
                  )}
                  <hr className="my-1 border-gray-100" />
                  <button onClick={handleLogout} className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">تسجيل الخروج</button>
                </div>
              )}
            </div>
          ) : (
            !meLoading && (
              <>
                <NavLink to="/login">
                  <CuButton className="!py-2 !px-5 !text-sm">تسجيل الدخول</CuButton>
                </NavLink>
                <NavLink to="/register">
                  <CuButton className="!py-2 !px-5 !text-sm">إنشاء حساب</CuButton>
                </NavLink>
              </>
            )
          )}
        </div>

        {/* Mobile section */}
        <div className="flex md:hidden items-center gap-2">
          {!meLoading && isAuthenticated ? (
            <div className="relative" ref={dropdownMobileRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">{avatarLetter}</div>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {user?.role === "worker" ? (
                    <>
                      <NavLink to="/worker/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">لوحة التحكم</NavLink>
                      <NavLink to="/worker/requests" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">إدارة الطلبات</NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/account-profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">الملف الشخصي</NavLink>
                      <NavLink to="/client-requests" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">طلبات العميل</NavLink>
                    </>
                  )}
                  <hr className="my-1 border-gray-100" />
                  <button onClick={handleLogout} className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">تسجيل الخروج</button>
                </div>
              )}
            </div>
          ) : (
            !meLoading && (
              <NavLink to="/login">
                <CuButton className="!py-1.5 !px-4 !text-xs">دخول</CuButton>
              </NavLink>
            )
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - rendered outside the fixed Navbar to avoid z-index conflicts */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 top-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 z-[60] h-full w-64 bg-white shadow-xl md:hidden" onClick={(e) => e.stopPropagation()}>
            {/* Brand header */}
            <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-gray-100">
              <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
              <span className="text-base font-bold text-gray-900">Osta Finder</span>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              <NavLink
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive ? "bg-orange-50 text-[var(--primary-color)]" : "text-gray-700 hover:bg-gray-50",
                  )
                }
              >
                الفئات
              </NavLink>
              {navLinks.filter(l => l.to !== "/categories").map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive ? "bg-orange-50 text-[var(--primary-color)]" : "text-gray-700 hover:bg-gray-50",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="my-2 border-gray-100" />
              <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                الأسئلة الشائعة
              </NavLink>
              <NavLink to="/privacy" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                سياسة الخصوصية
              </NavLink>
              {!isAuthenticated && (
                <>
                  <hr className="my-2 border-gray-100" />
                  <NavLink to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-center bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                    إنشاء حساب جديد
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
