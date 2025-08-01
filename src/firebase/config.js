import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBp8gXr0aTU8aGSaRPazcQHllud0byCP0c",
//   authDomain: "smile-inventory.firebaseapp.com",
//   projectId: "smile-inventory",
//   storageBucket: "smile-inventory.firebasestorage.app",
//   messagingSenderId: "746091796415",
//   appId: "1:746091796415:web:500a3488ffe1401781330a",
//   measurementId: "G-PWSMZJCBYP",
// };

//this shipon's config
const firebaseConfig = {
  apiKey: "AIzaSyCbQeasxogP7csbysyO5KtVN2iUfGu9EoY",
  authDomain: "friend-club-c81da.firebaseapp.com",
  projectId: "friend-club-c81da",
  storageBucket: "friend-club-c81da.appspot.com",
  messagingSenderId: "288587670797",
  appId: "1:288587670797:web:677cc4d67942e08db37c44",
  measurementId: "G-G7VRJ89Z64",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore_Db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
