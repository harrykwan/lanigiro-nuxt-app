import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useBody, useCookies, useQuery } from "h3";

const firebaseConfig = {
  apiKey: "AIzaSyBv3dYpsNsTOMseHTqOVRyJnVGOLkqgiz0",
  authDomain: "lani-9deed.firebaseapp.com",
  projectId: "lani-9deed",
  storageBucket: "lani-9deed.appspot.com",
  messagingSenderId: "1088966942325",
  appId: "1:1088966942325:web:a6ec92c5205f304af9223c",
  measurementId: "G-30NXYC5E3G",
};
// Initialize Firebase

export default async (req, res) => {
  const query = useQuery(req);
  const app = initializeApp(firebaseConfig);
  const firestoredb = getFirestore();
  const docRef = doc(firestoredb, "nftcache", query.userid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("Document data:");
    return data;
  }
  return "error";
};
