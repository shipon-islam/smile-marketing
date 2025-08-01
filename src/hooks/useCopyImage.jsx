import { storage } from "@/firebase/config"; // তোমার config ঠিক রাখো
import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

// extract path from full download URL
const getStoragePathFromUrl = (url) => {
  const decodedUrl = decodeURIComponent(url);
  const match = decodedUrl.match(/\/o\/(.*?)\?/);
  return match ? match[1] : null;
};

const useCopyImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const copyImage = async (imageUrl, destFolder = "client") => {
    setLoading(true);
    setError(null);
    try {
      const path = getStoragePathFromUrl(imageUrl);
      console.log(path);
      if (!path) throw new Error("Invalid image URL");

      const sourceRef = ref(storage, path);
      console.log(sourceRef);
      // ✅ real storage ref
      const blob = await getBlob(sourceRef);
      console.log("the blob is", blob);
      const destPath = `${destFolder}/checkout_${Date.now()}_.png`;
      const destRef = ref(storage, destPath);
      await uploadBytes(destRef, blob);
      const newUrl = await getDownloadURL(destRef);

      return newUrl;
    } catch (err) {
      console.error("Error copying image:", err.message);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { copyImage, loading, error };
};

export default useCopyImage;
