import { useState } from "react";
import { Outlet } from "react-router-dom";
import WorkerSidebar from "../features/worker/components/WorkerSidebar";

export default function WorkerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile Subheader Bar */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-30 shadow-xs">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-slate-800 text-sm">لوحة تحكم الأسطى</span>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:shrink-0 border-e border-gray-100">
          <WorkerSidebar />
        </div>

        {/* Mobile Drawer */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar drawer panel */}
            <div className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl z-50 transition-transform duration-300 transform translate-x-0">
              {/* Drawer header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-50">
                <span className="font-bold text-slate-800 text-sm">قائمة التحكم</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto">
                <WorkerSidebar onNavItemClick={() => setIsSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
