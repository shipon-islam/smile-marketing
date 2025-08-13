import { getSerializeData } from "@/utils/getSerializeData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useInventoryCount = () => {
  const [total, setTotal] = useState([]);
  const [checkedOut, setcheckedOut] = useState([]);
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
          getDocs(inventoryRef),
          getDocs(checkedoutQuery),
        ]);

        setTotal(
          getSerializeData(totalSnapshot).map((item) => ({
            price: item.price,
            stock: item.stock,
          }))
        );
        setcheckedOut(
          getSerializeData(checkedOutSnapshot).map((item) => ({
            price: item.price,
            stock: item.stock,
          }))
        );

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
