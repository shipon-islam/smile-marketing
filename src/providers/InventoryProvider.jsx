import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const InventoryContext = createContext();

export function UseInventory() {
  return useContext(InventoryContext);
}

export function InventoryProvider({ children }) {
  const [filters, setFilters] = useState({});
  const { pathname } = useLocation();
  const inventoriesAction = usePaginatedDocs(
    "inventories",
    {
      ...filters,
      isVisibleToClients: pathname === "/" ? true : false,
    },
    10
  );

  return (
    <InventoryContext.Provider value={{ ...inventoriesAction, setFilters }}>
      {children}
    </InventoryContext.Provider>
  );
}
