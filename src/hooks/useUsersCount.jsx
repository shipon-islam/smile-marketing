import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useUsersCount = () => {
  const [loading, setLoading] = useState(true);
  const [adminCount, setAdminCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [guestCount, setGuestCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const inventoryRef = collection(firestore_Db, "users");

        const adminQuery = query(inventoryRef, where("role", "==", "admin"));
        const teamQuery = query(inventoryRef, where("role", "==", "team"));
        const guestQuery = query(inventoryRef, where("role", "==", "guest"));

        const [admin, team, guest] = await Promise.all([
          getCountFromServer(adminQuery),
          getCountFromServer(teamQuery),
          getCountFromServer(guestQuery),
        ]);
        setAdminCount(admin.data().count);
        setTeamCount(team.data().count);
        setGuestCount(guest.data().count);

        setLoading(false);
      } catch (error) {
        console.error("Failed to get users counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return { adminCount, teamCount, guestCount, loading };
};

export default useUsersCount;
