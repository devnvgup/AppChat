// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAeG-DMYgvT06Hc5TUbzCYHCE94i_zcXOs",
  authDomain: "ch-app-e9bad.firebaseapp.com",
  projectId: "ch-app-e9bad",
  storageBucket: "ch-app-e9bad.appspot.com",
  messagingSenderId: "938733592721",
  appId: "1:938733592721:web:98e6643abdec725f909f30",
  measurementId: "G-TGX8LX0SBZ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

const analytics = getAnalytics(app);

export function startFireBase() {
  // Initialize Firebase
  const runApp = () => {
    return app;
  };

  const runAnalytics = () => {
    return analytics;
  };

  runApp();
  runAnalytics();

  const auth = getAuth();
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
  if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
}
