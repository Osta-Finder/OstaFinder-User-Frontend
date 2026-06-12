import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../services/authApi';

export default function ProtectedWorkerRoute({ children }) {
  const { data: user, isLoading } = useGetMeQuery();
  const reduxUser = useSelector((state) => state.auth.user);

  const currentUser = reduxUser || user;

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  if (!currentUser || currentUser.role !== 'worker') {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  if (currentUser.approvalStatus === 'pending') {
    return <Navigate to="/pending-approval" replace />;
  }

  if (currentUser.approvalStatus === 'rejected') {
    return <Navigate to="/rejected" replace />;
  }

  return children;
}
