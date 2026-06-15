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
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "./services/authApi";

export default function App() {
  const { data } = useGetMeQuery(); // Fetch user data on app load to check authentication status

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
        <ToastContainer autoClose={3000} limit={3} position="top-right" />
      </div>
    </>
  );
}
