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
    <div dir="rtl" className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      <div className="flex flex-1 relative pt-[76px] h-full">
        <WorkerSidebar />
        <main className="flex-1 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}