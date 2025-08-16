import { createContext, useContext, useState } from "react";

const UtilityContext = createContext();

export function UseUtility() {
  return useContext(UtilityContext);
}

export function AllUtilityProvider({ children }) {
  const [inventoryStatus, setInventoryStatus] = useState("");
  const [clientStatus, setClientStatus] = useState("");
  const [checkoutStatus, setCheckoutStatus] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const contextObj = {
    inventoryStatus,
    setInventoryStatus,
    clientStatus,
    setClientStatus,
    checkoutStatus,
    setCheckoutStatus,
    userStatus,
    setUserStatus,
  };
  return (
    <UtilityContext.Provider value={contextObj}>
      {children}
    </UtilityContext.Provider>
  );
}
