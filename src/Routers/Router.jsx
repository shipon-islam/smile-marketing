import { Route, Routes } from "react-router-dom";
import ClientPortal from "../pages/ClientPortal";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import Password from "../pages/Password";
import Providers from "../pages/Providers";
import Tickets from "../pages/Tickets";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/password" element={<Password />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/providers" element={<Providers />} />
    </Routes>
  );
}
