/**
 * ============================================
 * WORKER SIDEBAR COMPONENT
 * ============================================
 * Uses centralized routes config + startsWith matching
 * for nested route support
 */

import { Link, useLocation } from "react-router-dom";
import { WorkerRoutes, WorkerNavItems } from "../constants/routes.config";

const SidebarIcons = {
  LayoutDashboard: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  ClipboardList: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z" />
    </svg>
  ),
  Headphones: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

/**
 * Check if a path matches the current location using startsWith
 * This supports nested routes (e.g. /worker/services/1 matches /worker/services)
 */
const isActivePath = (currentPath, targetPath) => {
  return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
};

export default function WorkerSidebar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm";
    if (isActivePath(location.pathname, path)) {
      return baseClass + " bg-[#F26B1D] text-white";
    }
    return baseClass + " text-gray-500 hover:bg-gray-50 hover:text-slate-900";
  };

  return (
    <aside className="w-full lg:w-64 bg-white border-e border-gray-100 flex flex-col justify-between p-4 shrink-0">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 mb-6 mt-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border border-gray-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200"
              alt="الأسطى محمد"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-base font-bold text-slate-900">الأسطى محمد</h2>
          <p className="text-xs text-gray-400 mt-0.5">فني كهرباء معتمد</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {WorkerNavItems.map((item) => {
            const IconComponent = SidebarIcons[item.icon];
            return (
              <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                {IconComponent && <IconComponent />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 mb-4">
        <Link
          to={WorkerRoutes.SERVICE_ADD}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl font-medium transition-colors text-xs"
        >
          <SidebarIcons.Plus />
          <span>إضافة خدمة جديدة</span>
        </Link>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors text-xs">
          <SidebarIcons.LogOut />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}