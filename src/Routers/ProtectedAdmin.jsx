import { UseAuth } from "@/firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdmin() {
  const { currentUser } = UseAuth();

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdmin;
