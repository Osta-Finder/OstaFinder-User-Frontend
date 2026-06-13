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
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "./services/authApi";

export default function App() {
  // On every app load / reload, re-hydrate auth state from the server session (cookie-based).
  // This ensures onboardingCompleted and approvalStatus are always fresh from the backend.
  useGetMeQuery();

  return (
    <>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          color: "#191c1d",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
        <ToastContainer autoClose={3000} limit={3} />
      </div>
    </>
  );
}
