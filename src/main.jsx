import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./firebase/auth";
import "./index.css";

import { AllUtilityProvider } from "./providers/AllUtilityProvider.jsx";
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
          <AllUtilityProvider>
            <App />
          </AllUtilityProvider>
        </InventoryProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
