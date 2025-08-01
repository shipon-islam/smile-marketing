import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useCheckoutCount = () => {
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const inventoryRef = collection(firestore_Db, "checkout-requests");

        const pendingQuery = query(
          inventoryRef,
          where("status", "==", "pending")
        );
        const approvedQuery = query(
          inventoryRef,
          where("status", "==", "approved")
        );
        const rejectedQuery = query(
          inventoryRef,
          where("status", "==", "rejected")
        );

        const [admin, team, guest] = await Promise.all([
          getCountFromServer(pendingQuery),
          getCountFromServer(approvedQuery),
          getCountFromServer(rejectedQuery),
        ]);
        setPendingCount(admin.data().count);
        setApprovedCount(team.data().count);
        setRejectedCount(guest.data().count);

        setLoading(false);
      } catch (error) {
        console.error("Failed to get users counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return { pendingCount, approvedCount, rejectedCount, loading };
};

export default useCheckoutCount;
