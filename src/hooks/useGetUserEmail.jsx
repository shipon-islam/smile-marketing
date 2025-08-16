import { firestore_Db } from "@/firebase/config";
import { getSerializeData } from "@/utils/getSerializeData";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetUserEmail = () => {
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(
        query(collection(firestore_Db, "users"), orderBy("createdAt", "desc"))
      );
      setEmails(getSerializeData(usersSnap).map((user) => user.email));
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { loading, emails, fetchData };
};

export default useGetUserEmail;
