import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore_Db } from "../firebase/config";
export const usePaginatedDocs = (
  collectionName,
  filters = {},
  PAGE_SIZE = 5
) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageHistory, setPageHistory] = useState([]); // store lastVisible docs
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQueryFilters, setLastQueryFilters] = useState(filters);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(lastQueryFilters)) {
      setPageHistory([]);
      setCurrentPage(0);
      setLastQueryFilters(filters);
      fetchPage("initial", filters);
    }
  }, [filters]);

  const buildQuery = (direction, filters) => {
    let q = collection(firestore_Db, collectionName);

    const conditions = [];

    if (filters.category) {
      conditions.push(where("category", "==", filters.category));
    }

    if (filters.brand) {
      conditions.push(where("brand", "==", filters.brand));
    }

    if (filters.status) {
      conditions.push(where("status", "==", filters.status));
    }
    if (filters.isSelf) {
      conditions.push(where("isSelf", "==", filters.isSelf));
    }
    if (filters.role) {
      conditions.push(where("role", "==", filters.role));
    }
    if (filters.location) {
      conditions.push(where("location", "==", filters.location));
    }
    if (filters.price) {
      const priceArr = filters.price.split(" ");
      const price = priceArr[1].replace("$", "");
      if (priceArr[0] == "below") {
        conditions.push(where("price", "<=", Number(price)));
      } else {
        conditions.push(where("price", ">=", Number(price)));
      }
    }
    if (filters.search) {
      conditions.push(where("name", ">=", filters.search));
      conditions.push(where("name", "<=", filters.search + "\uf8ff"));
    }
    if (filters.nestedSearch) {
      conditions.push(where("inventory.name", ">=", filters.nestedSearch));
      conditions.push(
        where("inventory.name", "<=", filters.nestedSearch + "\uf8ff")
      );
    }
    if (filters.isVisibleToClients) {
      conditions.push(where("isVisibleToClients", "==", true));
    }
    if (filters.roleAccess) {
      conditions.push(where("access", "array-contains", "team"));
    }

    q = query(q, ...conditions, orderBy("createdAt", "desc"));

    if (direction === "next" && pageHistory[currentPage]) {
      q = query(q, startAfter(pageHistory[currentPage]), limit(PAGE_SIZE));
    } else if (direction === "prev" && currentPage > 1) {
      q = query(q, startAt(pageHistory[currentPage - 1]), limit(PAGE_SIZE));
    } else {
      q = query(q, limit(PAGE_SIZE));
    }

    return q;
  };

  const fetchPage = async (
    direction = "initial",
    filtersOverride = filters
  ) => {
    try {
      setLoading(true);
      setError(null);

      const q = buildQuery(direction, filtersOverride);
      const snapshot = await getDocs(q);

      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      setItems(docs);

      if (direction === "next") {
        setPageHistory((prev) => [...prev, lastVisible]);
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "prev") {
        setCurrentPage((prev) => prev - 1);
      } else {
        // Initial load: set history as [null, lastVisible] to make currentPage = 1 work
        setPageHistory([null, lastVisible]);
        setCurrentPage(1);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error loading inventory:", err);
      setError("Inventory load failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 0) fetchPage("initial", filters);
  }, []);

  return {
    items,
    loading,
    error,
    hasNext: items.length === PAGE_SIZE,
    hasPrev: currentPage > 1,
    nextPage: () => fetchPage("next"),
    prevPage: () => fetchPage("prev"),
    refetch: () => fetchPage("initial", filters),
  };
};
