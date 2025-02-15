// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp1z_CaHHBSNOo5Zl2sPZn2_kvFi1xOwE",
  authDomain: "costkeeper-2e6ad.firebaseapp.com",
  projectId: "costkeeper-2e6ad",
  storageBucket: "costkeeper-2e6ad.firebasestorage.app",
  messagingSenderId: "519318775159",
  appId: "1:519318775159:web:b2fc1167090af01ebe6d72",
  measurementId: "G-D0VJQGF0H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };