import { useEffect, useState } from "react";

import {
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";


function useFirestore(collectionName, condition, addRoomFlag) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const docRef = collection(db, collectionName);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
    }
    const q = query(docRef, where(condition.fieldName, condition.operator, condition.compareValue));
    const records = [];
    const querySnapshot = async()=>{
       let res = await getDocs(q);
       //TODO: check logic add room when finish project
       res.forEach((doc) => {
          records.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(records)
    }
    querySnapshot()
  }, [collectionName, condition, addRoomFlag]);
  return documents;
}

export default useFirestore;
