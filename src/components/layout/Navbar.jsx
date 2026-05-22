import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (active) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      active ? "bg-[#5A2D0C] text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-[#5A2D0C] font-bold text-lg">OstaFinder</div>

        {/* Links */}
        <ul className="flex items-center gap-2">
          <li>
            <Link className={linkStyle(isActive("/"))} to="/">
              الرئيسية
            </Link>
          </li>

          <li>
            <Link
              className={linkStyle(isActive("/worker/dashboard"))}
              to="/worker/dashboard"
            >
              لوحة التحكم
            </Link>
          </li>

          <li>
            <Link
              className={linkStyle(isActive("/worker/requests"))}
              to="/worker/requests"
            >
              الطلبات
            </Link>
          </li>

          <li>
            <Link
              className={linkStyle(isActive("/worker/services"))}
              to="/worker/services"
            >
              الخدمات
            </Link>
          </li>

          <li>
            <Link
              className={linkStyle(isActive("/worker/services/add"))}
              to="/worker/services/add"
            >
              إضافة خدمة
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
