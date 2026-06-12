import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../services/authApi';

/**
 * OnboardingGuard protects the onboarding route
 * - If onboarding is already completed, redirect to pending approval
 * - If already approved, redirect to dashboard
 * - If not authenticated as worker, redirect to login
 * - Otherwise, allow access to onboarding
 */
export default function OnboardingGuard({ children }) {
  const { data: user, isLoading } = useGetMeQuery();
  const reduxUser = useSelector((state) => state.auth.user);

  const currentUser = reduxUser || user;

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  // Not authenticated or not a worker - redirect to login
  if (!currentUser || currentUser.role !== 'worker') {
    return <Navigate to="/login" replace />;
  }

  // Onboarding already completed - don't show the form again
  if (currentUser.onboardingCompleted) {
    // If pending approval, go there
    if (currentUser.approvalStatus === 'pending') {
      return <Navigate to="/pending-approval" replace />;
    }
    // If approved, go to dashboard
    if (currentUser.approvalStatus === 'approved') {
      return <Navigate to="/worker/dashboard" replace />;
    }
    // If rejected, go to rejected page
    if (currentUser.approvalStatus === 'rejected') {
      return <Navigate to="/rejected" replace />;
    }
  }

  // Onboarding not completed - allow access
  return children;
}
