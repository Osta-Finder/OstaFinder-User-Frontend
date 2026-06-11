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
import ClientProfile from "../features/client/pages/ClientProfile";
import ClientRating from "../features/client/pages/ClientRating";
import ClientRequests from "../features/client/pages/ClientRequests";
import CreateOrderPage from "../features/client/pages/createOrderPage";
import Settings from "../features/client/pages/Settings";
import AboutUs from "../features/public/pages/AboutUs";
import ContactUs from "../features/public/pages/ContactUs";
import LandingPage from "../features/public/pages/LandingPage";
import { WorkerRoutes } from "../features/worker/constants/routes.config";
import AddService from "../features/worker/pages/AddService";
import IncomingRequests from "../features/worker/pages/IncomingRequests";
import PreviousWorks from "../features/worker/pages/PreviousWorks";
import Service from "../features/worker/pages/Service";
import ServicesManagement from "../features/worker/pages/ServicesManagement";

import WorkDetails from "../features/worker/pages/WorkDetails";
import AddWork from "../features/worker/pages/AddWork";
import EditWork from "../features/worker/pages/EditWork";
import TechnicianProfile from "../features/worker/pages/TechincalProfile";
import WorkDetails from "../features/worker/pages/WorkDetails";
import WorkerDashboard from "../features/worker/pages/WorkerDashboard";
import WorkerLayout from "../layouts/WorkerLayout";

import CreateOrderPage from "../features/client/pages/createOrderPage";
import RequestDetailsPage from "./../features/worker/pages/RequestDetailsPage";
// import TechnicianProfile from "../features/worker/pages/TechincalProfile";
import UploadTest from "../features/test/UploadTest";

export default function AppRoutes() {
  return (
    <>
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
        <Route path="/request-details/" element={<RequestDetailsPage />} />

        {/* Worker Routes - All wrapped in WorkerLayout */}
        {/* <Route path="/onboarding-demo" element={<OnboardingDemo />} />
        <Route path="/onboarding" element={<WorkerOnboarding />} /> */}
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
          <Route path={`${WorkerRoutes.WORKS}/add`} element={<AddWork />} />
          <Route path={`${WorkerRoutes.WORKS}/edit/:id`} element={<EditWork />} />
          <Route
            path={WorkerRoutes.WORK_DETAIL(":id")}
            element={<WorkDetails />}
          />
        </Route>
        <Route path="request-details/:id" element={<RequestDetailsPage />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared Routes */}
        {/* <Route path="/worker-profile" element={<WorkerProfile />} /> */}
        <Route path={WorkerRoutes.PROFILE} element={<TechnicianProfile />} />

        {/* Test */}
        <Route path="/upload-test" element={<UploadTest />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center">404 - الصفحة غير موجودة</div>
          }
        />
      </Routes>
    </>
  );
}
