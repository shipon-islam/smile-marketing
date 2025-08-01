import { firestore_Db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useCreateDocument() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const createDocument = async (
    collectionName,
    collectionObj,
    successMessage
  ) => {
    setLoading(false);
    setSuccess(false);
    try {
      const collectionRef = collection(firestore_Db, collectionName);
      const result = await addDoc(collectionRef, {
        ...collectionObj,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setLoading(false);
      if (successMessage) {
        toast.success(`${successMessage} is created successfully`);
      }

      return result;
    } catch (error) {
      console.log(collectionName, error);
      toast.error(error.message);
      setSuccess(false);
      setLoading(false);
    }
  };
  return { createDocument, loading, success };
}
