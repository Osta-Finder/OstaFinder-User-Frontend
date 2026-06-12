import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../services/authApi';

export default function ProtectedWorkerRoute({ children }) {
  const { data: user, isLoading } = useGetMeQuery();
  const onboardingCompleted = localStorage.getItem('onboardingCompleted');

  console.log('ProtectedWorkerRoute - Full response:', { data: user, isLoading });
  console.log('User object:', user);
  console.log('User role:', user?.role);
  console.log('User isOnboarded:', user?.isOnboarded);
  console.log('User approvalStatus:', user?.approvalStatus);
  console.log('Onboarding completed flag:', onboardingCompleted);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  // Check if user is authenticated and is a worker
  if (!user || user.role !== 'worker') {
    console.log('Not a worker or not authenticated - user:', user);
    return <Navigate to="/login" replace />;
  }

  // If onboarding was just completed, show pending-approval
  if (onboardingCompleted === 'true') {
    console.log('Onboarding just completed, redirecting to pending-approval');
    return <Navigate to="/pending-approval" replace />;
  }

  // Check if worker's approval is pending (this takes priority over onboarding)
  if (user.approvalStatus === 'pending') {
    console.log('Redirecting to pending-approval');
    return <Navigate to="/pending-approval" replace />;
  }

  // Check if worker was rejected
  if (user.approvalStatus === 'rejected') {
    console.log('Redirecting to rejected');
    return <Navigate to="/rejected" replace />;
  }

  // Check if worker has completed onboarding
  if (!user.isOnboarded) {
    console.log('Redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  console.log('Showing dashboard');
  // User is authenticated, onboarded, and approved
  return children;
}
