/**
 * ============================================
 * WORKER GUARD
 * ============================================
 * Enforces worker flow based on backend state:
 *   onboardingCompleted = false  → /onboarding
 *   onboardingCompleted = true  + approvalStatus = pending   → /worker/pending-approval
 *   onboardingCompleted = true  + approvalStatus = rejected  → /worker/rejected
 *   onboardingCompleted = true  + approvalStatus = approved  → renders children (worker dashboard)
 *
 * Non-workers are redirected to home.
 * Unauthenticated users are redirected to /login.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../services/authApi";

export default function WorkerGuard() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { isLoading } = useGetMeQuery(undefined, { skip: !!user });

  // While fetching session, show nothing (avoid flash redirects)
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "2rem",
            color: "#a83900",
            animation: "spin 1s linear infinite",
          }}
        >
          autorenew
        </span>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Not a worker
  if (user.role !== "worker") {
    return <Navigate to="/" replace />;
  }

  // Onboarding not completed → force onboarding
  if (!user.onboardingCompleted) {
    if (location.pathname !== "/onboarding") {
      return <Navigate to="/onboarding" replace />;
    }
    return <Outlet />;
  }

  // Onboarding done, check approval
  const approval = user.approvalStatus;

  if (approval === "pending") {
    if (location.pathname !== "/worker/pending-approval") {
      return <Navigate to="/worker/pending-approval" replace />;
    }
    return <Outlet />;
  }

  if (approval === "rejected") {
    if (location.pathname !== "/worker/rejected") {
      return <Navigate to="/worker/rejected" replace />;
    }
    return <Outlet />;
  }

  // Fully approved — allow access to worker pages
  return <Outlet />;
}
