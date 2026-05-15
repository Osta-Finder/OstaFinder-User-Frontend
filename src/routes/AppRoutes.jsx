import { Route, Routes } from "react-router-dom";
import LandingPage from "../features/public/pages/LandingPage";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ContactUs from "../features/public/pages/ContactUs";
import Categories from "../features/client/pages/Categories";
import ClientHome from "../features/client/pages/ClientHome";
import ClientRequests from "../features/client/pages/ClientRequests";
import WorkerProfile from "../features/shared/WorkerProfile";
import WorkerDashboard from "../features/worker/pages/WorkerDashboard";
import ClientProfile from "../features/client/pages/ClientProfile";
import Settings from "../features/client/pages/Settings";
import AboutUs from "../features/public/pages/AboutUs";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        // Public Routes
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        // Client Routes
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/client-requests" element={<ClientRequests />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        // Worker Routes
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              
        // Auth Routes
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        // shared routes
        <Route path="/worker-profile" element={<WorkerProfile />} />
        // 404
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
