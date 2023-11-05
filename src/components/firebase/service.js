import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp  } from "firebase/firestore";

export const addDocument = async(nameCollection,data) => {
    try {
      const query = await addDoc(collection(db, nameCollection), {
        ...data,
        createdAt: serverTimestamp(),
      })
    } catch (error) {
        console.log(error);
    }
}