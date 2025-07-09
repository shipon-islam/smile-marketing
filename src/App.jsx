import Header from "./components/Header";
import SidebarWraper from "./components/SidebarWraper";
import Router from "./Routers/Router";

export default function App() {
  return (
    <div className="font-poppins bg-light text-gray-700">
      <Header />
      <SidebarWraper>
        <Router />
      </SidebarWraper>
    </div>
  );
}
