import InternalUsers from "@/pages/InternalUsers";
import { Route, Routes } from "react-router-dom";
import CheckoutRequest from "../pages/CheckoutRequest";
import ClientPortal from "../pages/ClientPortal";
import ClientRequest from "../pages/ClientRequest";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import Password from "../pages/Password";
import Providers from "../pages/Providers";
import Tickets from "../pages/Tickets";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/client-requests" element={<ClientRequest />} />
      <Route path="/checkout-requests" element={<CheckoutRequest />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/password" element={<Password />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/internal_users" element={<InternalUsers />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
