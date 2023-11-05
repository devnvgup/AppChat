import { startFireBase, db } from "./config";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";

startFireBase();
export const addDocument = (collectionName, data, uid) => {
  setDoc(doc(db, collectionName, uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
  console.log("add Database success");
};
