import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Router from "./Routers/Router";

export default function App() {
  return (
    <div className="font-poppins bg-light text-gray-700 min-h-screen">
      <Header />
      <Router />
      <Toaster />
    </div>
  );
}
