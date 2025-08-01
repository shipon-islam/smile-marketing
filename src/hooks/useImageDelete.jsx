import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/config";

const useImageDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteImage = async (imageURL) => {
    setDeleting(true);
    setError(null);
    setSuccess(false);

    try {
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setDeleting(false);
    }
  };

  return { deleteImage, deleting, error, success };
};

export default useImageDelete;
