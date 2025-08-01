import { firestore_Db } from "@/firebase/config";
import { getSerializeData } from "@/utils/getSerializeData";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetCatBrandLoc = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [categorySnap, brandSnap, locationSnap, tagSnap] =
        await Promise.all([
          getDocs(
            query(
              collection(firestore_Db, "categories"),
              orderBy("createdAt", "desc")
            )
          ),
          getDocs(
            query(
              collection(firestore_Db, "brands"),
              orderBy("createdAt", "desc")
            )
          ),
          getDocs(
            query(
              collection(firestore_Db, "locations"),
              orderBy("createdAt", "desc")
            )
          ),
          getDocs(
            query(
              collection(firestore_Db, "tags"),
              orderBy("createdAt", "desc")
            )
          ),
        ]);
      setCategories(getSerializeData(categorySnap));
      setBrands(getSerializeData(brandSnap));
      setLocations(getSerializeData(locationSnap));
      setTags(getSerializeData(tagSnap));
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { loading, categories, brands, locations, tags, fetchData };
};

export default useGetCatBrandLoc;
