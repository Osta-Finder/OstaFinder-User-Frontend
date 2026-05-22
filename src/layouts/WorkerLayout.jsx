/**
 * ============================================
 * WORKER LAYOUT
 * ============================================
 * Contains sidebar + main content area
 * All worker pages are nested here via <Outlet />
 * Do NOT add min-h-screen here - pages manage their own height
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import WorkerSidebar from "../features/worker/components/WorkerSidebar";

export default function WorkerLayout() {
  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <WorkerSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}