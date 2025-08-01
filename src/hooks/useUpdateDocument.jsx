import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firestore_Db } from "../firebase/config";

const useUpdateDocument = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateDocument = async (
    id,
    collectionName,
    updateObject,
    successMessage = true
  ) => {
    setLoading(true);
    setSuccess(false);

    try {
      const collectionRef = doc(firestore_Db, collectionName, id);
      const result = await updateDoc(collectionRef, updateObject);
      if (successMessage) {
        toast.success("Updated successfully!");
      }

      setSuccess(true);
      setLoading(false);
      return result;
    } catch (err) {
      toast.error(err.message);
      setSuccess(true);
      setLoading(false);
      console.log(err);
    }
  };

  return { updateDocument, success, loading };
};

export default useUpdateDocument;
