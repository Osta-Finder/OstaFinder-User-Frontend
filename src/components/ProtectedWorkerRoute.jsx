import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../services/authApi';

export default function ProtectedWorkerRoute({ children }) {
  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  // Check if user is authenticated and is a worker
  if (!user || user.role !== 'worker') {
    return <Navigate to="/login" replace />;
  }

  // Check if worker has completed onboarding
  if (!user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  // User is authenticated and has completed onboarding
  return children;
}
