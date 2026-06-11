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
  const dropdownRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  // const user = meData;
  // const isAuthenticated = isLoggedIn;
  const avatarLetter = user?.name?.charAt(0) || "U";

//   useEffect(() => {
//     if (!isHome) return;
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [isHome]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     setDropdownOpen(false);
//     await logout();
//     navigate("/");
//   };

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
        <span className="hidden sm:inline-block text-lg font-semibold">
          Osta Finder
        </span>
        <img
          src={logo}
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
            clsx(
              "transition-colors",
              isActive && "font-semibold underline underline-offset-4",
              isActive ? "text-[var(--primary-color)]" : "",
            )
          }
        >
          الفئات
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            clsx(
              "transition-colors",
              isActive && "font-semibold underline underline-offset-4",
              isActive ? "text-[var(--primary-color)]" : "",
            )
          }
        >
          تواصل معنا
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            clsx(
              "transition-colors",
              isActive && "font-semibold underline underline-offset-4",
              isActive ? "text-[var(--primary-color)]" : "",
            )
          }
        >
          احنا مين؟
        </NavLink>
      </div>

      {/* right: auth section */}
      <div className="flex items-center gap-4">
        {!meLoading && isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                {avatarLetter}
              </div>
              <span className="text-sm font-medium max-w-[100px] truncate">
                {user?.name}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <NavLink
                  to="/client-profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  الملف الشخصي
                </NavLink>
                <NavLink
                  to="/client-requests"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  طلبات العميل
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  الإعدادات
                </NavLink>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          !meLoading && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  clsx(
                    "cursor-pointer",
                    isActive && "underline underline-offset-4",
                  )
                }
              >
                <CuButton>تسجيل الدخول</CuButton>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  clsx(
                    "cursor-pointer",
                    isActive && "underline underline-offset-4",
                  )
                }
              >
                <CuButton>إنشاء حساب</CuButton>
              </NavLink>
            </>
          )
        )}
      </div>
    </div>
  );
}
