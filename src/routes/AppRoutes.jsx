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
import Service from "../features/worker/pages/Service";
import ServicesManagement from "../features/worker/pages/ServicesManagement";
import WorkerOnboarding from "../features/worker/pages/WorkerOnboarding";
import OnboardingSuccess from "../features/worker/pages/OnboardingSuccess";
import OnboardingDemo from "../features/worker/pages/OnboardingDemo";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/client-requests" element={<ClientRequests />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services-management" element={<ServicesManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="/worker-onboarding" element={<WorkerOnboarding />} />
        <Route path="/onboarding-success" element={<OnboardingSuccess />} />
        <Route path="/onboarding-demo" element={<OnboardingDemo />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
