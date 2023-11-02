// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUHTJSHMkq-zRJddrJCsRZWpqExO6ymeQ",
  authDomain: "appfirebase-bf0a7.firebaseapp.com",
  projectId: "appfirebase-bf0a7",
  storageBucket: "appfirebase-bf0a7.appspot.com",
  messagingSenderId: "248439405652",
  appId: "1:248439405652:web:17167c1badff3efcc741c1",
  measurementId: "G-G2NK90024B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);