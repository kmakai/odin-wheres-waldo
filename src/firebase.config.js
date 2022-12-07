// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB32jcQwj3WeURFGPj0agS38JGaBq2uotc",
  authDomain: "find-the-character.firebaseapp.com",
  projectId: "find-the-character",
  storageBucket: "find-the-character.appspot.com",
  messagingSenderId: "270754369371",
  appId: "1:270754369371:web:761746f5b0a8ed527e947e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
