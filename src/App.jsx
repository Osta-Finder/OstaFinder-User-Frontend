/**
 * ============================================
 * APP ROOT
 * ============================================
 * Navbar is NOT rendered here globally.
 * Each layout (WorkerLayout, MainLayout, etc.) manages its own Navbar.
 * This prevents double-navbar issues when layouts include their own header.
 */

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
