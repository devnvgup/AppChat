import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBceUss654CgrQvua7W37rV8En4E6ASGz0",
    authDomain: "chat-app-realtime-fc3d1.firebaseapp.com",
    projectId: "chat-app-realtime-fc3d1",
    storageBucket: "chat-app-realtime-fc3d1.appspot.com",
    messagingSenderId: "864234456481",
    appId: "1:864234456481:web:19d2fff4aa2f807e63b7e0",
    measurementId: "G-RN9FNEX1ZB"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const authen = getAuth(app);
  const db = getFirestore (app);

 export {db, authen};
