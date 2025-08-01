import { firestore_Db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useDeleteDocument() {
  const [loading, setLoading] = useState(false);

  const deleteDocument = async (documentId, collectionName) => {
    try {
      setLoading(true);
      const result = await deleteDoc(
        doc(firestore_Db, collectionName, documentId)
      );
      setLoading(false);
      toast.success("Deleted successfully!");
      return result;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return { deleteDocument, loading };
}
