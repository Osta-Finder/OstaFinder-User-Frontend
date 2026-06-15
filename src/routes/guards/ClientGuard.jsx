import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ClientGuard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "client") {
    if (user.role === "worker") {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
