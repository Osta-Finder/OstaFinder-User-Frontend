import { Route, Routes } from "react-router-dom";
import WorkerOnboarding from "../features/worker/pages/WorkerOnboarding";
import OnboardingSuccess from "../features/worker/pages/OnboardingSuccess";
import LandingPage from "../features/public/pages/LandingPage";
import ContactUs from "../features/public/pages/ContactUs";
import AboutUs from "../features/public/pages/AboutUs";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WorkerOnboarding />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/worker-onboarding" element={<WorkerOnboarding />} />
        <Route path="/onboarding-success" element={<OnboardingSuccess />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
