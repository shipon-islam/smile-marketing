import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth, firestore_Db } from "./config";

const AuthContext = React.createContext();

export function UseAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore_Db, "users", user.uid);
        const userSnap = await getDoc(docRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentUser({
            ...userData,
          });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  // logout function
  function logout() {
    signOut(auth);
    return navigate("/");
  }
  //signup with google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // const user = result?.user;
    // if (user && !user.email.endsWith("@smilemkt.com")) {
    //   signOut(auth);
    //   toast.error("You can't login with @smilemkt.com email");
    //   setTimeout(() => {
    //     window?.location.reload();
    //   }, 200);

    //   return;
    // }

    const { uid, displayName, email, photoURL } = auth.currentUser;

    const docRef = doc(firestore_Db, "users", uid);
    const userSnap = await getDoc(docRef);
    if (!userSnap?.exists()) {
      await setDoc(docRef, {
        id: uid,
        email,
        role: "guest",
        name: displayName.toLowerCase(),
        avatar: photoURL,
        createdAt: Timestamp.now(),
      });
    }
    if (userSnap?.exists() && userSnap.data().role !== "guest") {
      toast.success("Login successful");
      return navigate("/dashboard");
    }
    toast.success("Login successful");
    return navigate("/");
  };

  useEffect;
  const value = {
    currentUser,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
