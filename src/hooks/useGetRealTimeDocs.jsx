import { firestore_Db } from "@/firebase/config";
import { getSerializeData } from "@/utils/getSerializeData";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetRealTimeDocs = (collectionName, pageLimit = 15) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(firestore_Db, collectionName),
      orderBy("createdAt", "desc"),
      limit(pageLimit)
    );

    setLoading(true);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDocuments(getSerializeData(snapshot));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName, pageLimit]);

  return { documents, loading };
};
