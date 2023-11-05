import { useEffect, useState } from "react";

import {
  query,
  where,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";


function useFirestore(collectionName, condition, addRoomFlag) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const docRef = collection(db, collectionName);
  
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data
        setDocuments([]);
        return;
      }
    }
  
    const q = query(docRef, where(condition.fieldName, condition.operator, condition.compareValue));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const records = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(records);
    });
  
    return () => {
      // Unsubscribe when the component unmounts to prevent memory leaks
      unsubscribe();
    }
  }, [collectionName, condition, addRoomFlag]);
  
  return documents;
}

export default useFirestore;
