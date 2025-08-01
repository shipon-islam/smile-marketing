import { firestore_Db } from "@/firebase/config";
import { getSerializeData } from "@/utils/getSerializeData";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useRealtimeCatBrandTagLoc = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsubscribes = [];

    const collections = [
      { name: "categories", setter: setCategories },
      { name: "brands", setter: setBrands },
      { name: "locations", setter: setLocations },
      { name: "tags", setter: setTags },
    ];

    collections.forEach(({ name, setter }) => {
      const q = query(
        collection(firestore_Db, name),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setter(getSerializeData(snapshot));
          setLoading(false);
        },
        (error) => {
          console.error(`Error listening to ${name}:`, error);
          setLoading(false);
        }
      );
      unsubscribes.push(unsubscribe);
    });

    // Cleanup on unmount
    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, []);

  return { loading, categories, brands, locations, tags };
};

export default useRealtimeCatBrandTagLoc;
