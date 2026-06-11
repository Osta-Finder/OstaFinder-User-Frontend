import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../services/authApi';

export default function ProtectedWorkerRoute({ children }) {
  const { data: user, isLoading } = useGetMeQuery();

  console.log('ProtectedWorkerRoute - user:', user, 'isLoading:', isLoading);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  // Check if user is authenticated and is a worker
  if (!user || user.role !== 'worker') {
    console.log('Not a worker or not authenticated');
    return <Navigate to="/login" replace />;
  }

  // Check if worker has completed onboarding
  if (!user.isOnboarded) {
    console.log('Not onboarded, redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  // Check if worker's approval is pending
  if (user.approvalStatus === 'pending') {
    console.log('Approval pending, redirecting to pending-approval');
    return <Navigate to="/pending-approval" replace />;
  }

  // Check if worker was rejected
  if (user.approvalStatus === 'rejected') {
    console.log('Worker rejected, redirecting to rejected');
    return <Navigate to="/rejected" replace />;
  }

  console.log('Worker approved, showing content');
  // User is authenticated, onboarded, and approved
  return children;
}
