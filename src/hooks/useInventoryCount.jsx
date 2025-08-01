import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useInventoryCount = () => {
  const [total, setTotal] = useState(0);
  const [checkedOut, setcheckedOut] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const inventoryRef = collection(firestore_Db, "inventories");
        const checkedoutQuery = query(
          inventoryRef,
          where("status", "==", "checked out")
        );
        const [totalSnapshot, checkedOutSnapshot] = await Promise.all([
          getCountFromServer(inventoryRef),
          getCountFromServer(checkedoutQuery),
        ]);
        setTotal(totalSnapshot.data().count);
        setcheckedOut(checkedOutSnapshot.data().count);

        setLoading(false);
      } catch (error) {
        console.error("Failed to get inventory counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return { total, checkedOut, loading };
};

export default useInventoryCount;
