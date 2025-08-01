import { UseAuth } from "@/firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedTeam() {
  const { currentUser } = UseAuth();

  if (
    !currentUser ||
    (currentUser.role !== "team" && currentUser.role !== "admin")
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedTeam;
