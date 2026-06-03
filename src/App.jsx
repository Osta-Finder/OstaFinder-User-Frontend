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
import { useGetMeQuery } from "./services/authApi";

export default function App() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery();
  console.log( "meData", meData);
  
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </>
  );
}
