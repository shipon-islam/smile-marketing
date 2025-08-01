import { getSerializeData } from "@/utils/getSerializeData";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";

const useNotificationCount = () => {
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore_Db, "notifications"),
      where("isView", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotify(getSerializeData(snapshot));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { notify, loading };
};

export default useNotificationCount;
