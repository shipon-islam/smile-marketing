import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useClientRequestCount = () => {
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const inventoryRef = collection(firestore_Db, "client-requests");

        const newQuery = query(inventoryRef, where("status", "==", "new"));
        const inProgressQuery = query(
          inventoryRef,
          where("status", "==", "in_progress")
        );
        const completedQuery = query(
          inventoryRef,
          where("status", "==", "completed")
        );

        const [admin, team, guest] = await Promise.all([
          getCountFromServer(newQuery),
          getCountFromServer(inProgressQuery),
          getCountFromServer(completedQuery),
        ]);
        setNewCount(admin.data().count);
        setInProgressCount(team.data().count);
        setCompletedCount(guest.data().count);

        setLoading(false);
      } catch (error) {
        console.error("Failed to get users counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return { newCount, inProgressCount, completedCount, loading };
};

export default useClientRequestCount;
