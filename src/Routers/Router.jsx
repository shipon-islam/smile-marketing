import SidebarWraper from "@/components/SidebarWraper";
import CheckoutRequestForm from "@/pages/checkout-request/CheckoutRequestForm";
import ErrorPage from "@/pages/ErrorPage";
import ClientRequestForm from "@/pages/home/ClientRequestForm";
import Home from "@/pages/home/Home";
import InventoryInfo from "@/pages/home/InventoryInfo";
import CreateInventory from "@/pages/inventory/CreateInventory";
import EditInventory from "@/pages/inventory/EditInventory";
import InventoryDetails from "@/pages/inventory/InventoryDetails";
import CreatePassword from "@/pages/password/CreatePassword";
import EditPassword from "@/pages/password/EditPassword";
import Profile from "@/pages/Profile";
import EditProvider from "@/pages/provider/EditProvider";
import InternalUsers from "@/pages/user/InternalUsers";
import { Outlet, Route, Routes } from "react-router-dom";
import CheckoutRequest from "../pages/checkout-request/CheckoutRequest";
import ClientRequest from "../pages/ClientRequest";
import Inventory from "../pages/inventory/Inventory";
import Login from "../pages/Login";
import Password from "../pages/password/Password";
import Providers from "../pages/provider/Providers";
import TeamPortal from "../pages/team-portal/TeamPortal";
import ProtectedAdmin from "./ProtectedAdmin";
import ProtectedTeam from "./ProtectedTeam";

function LayoutWrapper() {
  return (
    <SidebarWraper>
      <Outlet />
    </SidebarWraper>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<LayoutWrapper />}>
        {/* Team and Admin Shared Routes */}
        <Route element={<ProtectedTeam />}>
          <Route path="checkout-requests" element={<CheckoutRequest />} />
          <Route path="password" element={<Password />} />
          <Route path="team-portal" element={<TeamPortal />} />
          <Route
            path="checkout-request-form"
            element={<CheckoutRequestForm />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<ProtectedAdmin />}>
          <Route path="client-requests" element={<ClientRequest />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="create-inventory" element={<CreateInventory />} />
          <Route path="edit-inventory/:id" element={<EditInventory />} />
          <Route path="inventory/:id" element={<InventoryDetails />} />
          <Route path="create-password" element={<CreatePassword />} />
          <Route path="edit-password/:id" element={<EditPassword />} />
          <Route path="providers" element={<Providers />} />
          <Route path="edit-provider/:id" element={<EditProvider />} />
          <Route path="internal-users" element={<InternalUsers />} />
        </Route>
      </Route>
      <Route path="/inventory/:id" element={<InventoryInfo />} />
      <Route path="client-request-form" element={<ClientRequestForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
