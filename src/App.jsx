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
import { useEffect } from "react";

export default function App() {
  const looggedin = localStorage.getItem("loggedIN")
    ? localStorage.getItem("loggedIN")
    : null;
  if (looggedin) {
    console.log("loggedIN");
    const { data: meData, isLoading: meLoading } = useGetMeQuery();
    console.log("meData", meData);
  }
  // useEffect(() => {
  //   if (looggedin) {
  //     console.log("loggedIN");
  //   }
  // }, []);
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
