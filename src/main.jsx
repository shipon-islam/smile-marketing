import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./firebase/auth";
import "./index.css";
import { InventoryProvider } from "./providers/InventoryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <AuthProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
