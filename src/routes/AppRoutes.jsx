/**
 * ============================================
 * APP ROUTES
 * ============================================
 * All worker routes now use centralized route config
 */

import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Categories from "../features/client/pages/Categories";
import ClientHome from "../features/client/pages/ClientHome";
import ClientRequests from "../features/client/pages/ClientRequests";
import ClientRating from "../features/client/pages/ClientRating";
import WorkerProfile from "../features/shared/WorkerProfile";
import WorkerDashboard from "../features/worker/pages/WorkerDashboard";
import ClientProfile from "../features/client/pages/ClientProfile";
import ClientRequests from "../features/client/pages/ClientRequests";
import Settings from "../features/client/pages/Settings";
import AboutUs from "../features/public/pages/AboutUs";
import ContactUs from "../features/public/pages/ContactUs";
import LandingPage from "../features/public/pages/LandingPage";
import WorkerProfile from "../features/shared/WorkerProfile";
import { WorkerRoutes } from "../features/worker/constants/routes.config";
import AddService from "../features/worker/pages/AddService";
import IncomingRequests from "../features/worker/pages/IncomingRequests";
import PreviousWorks from "../features/worker/pages/PreviousWorks";
import Service from "../features/worker/pages/Service";
import ServicesManagement from "../features/worker/pages/ServicesManagement";
import IncomingRequests from "../features/worker/pages/IncomingRequests";
import AddService from "../features/worker/pages/AddService";
import PreviousWorks from "../features/worker/pages/PreviousWorks";
import WorkDetails from "../features/worker/pages/WorkDetails";
import TechnicianProfile from "../features/worker/pages/TechincalProfile";
import WorkerLayout from "../layouts/WorkerLayout";
import { WorkerRoutes } from "../features/worker/constants/routes.config";
import CreateOrderPage from "../features/client/pages/createOrderPage";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Client Routes */}
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/client-requests" element={<ClientRequests />} />
        <Route path="/client-ratings" element={<ClientRating />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/create-order/:workerId" element={<CreateOrderPage />} />

        {/* Worker Routes - All wrapped in WorkerLayout */}
        <Route element={<WorkerLayout />}>
          <Route path={WorkerRoutes.DASHBOARD} element={<WorkerDashboard />} />
          <Route path={WorkerRoutes.REQUESTS} element={<IncomingRequests />} />
          <Route path={WorkerRoutes.SERVICE_ADD} element={<AddService />} />
          <Route
            path={WorkerRoutes.SERVICE_DETAIL(":id")}
            element={<Service />}
          />
          <Route
            path={WorkerRoutes.SERVICES}
            element={<ServicesManagement />}
          />
          <Route path={WorkerRoutes.WORKS} element={<PreviousWorks />} />
          <Route
            path={WorkerRoutes.WORK_DETAIL(":id")}
            element={<WorkDetails />}
          />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared Routes */}
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path={WorkerRoutes.PROFILE} element={<TechnicianProfile />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center">404 - الصفحة غير موجودة</div>
          }
        />
      </Routes>
    </div>
  );
}
