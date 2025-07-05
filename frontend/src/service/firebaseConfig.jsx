// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN5DyvCnoxOfmo0rAzjJ1dKTwiHPP8tjY",
  authDomain: "ai-trip-planner-e86e3.firebaseapp.com",
  projectId: "ai-trip-planner-e86e3",
  storageBucket: "ai-trip-planner-e86e3.firebasestorage.app",
  messagingSenderId: "1049084133688",
  appId: "1:1049084133688:web:1a8cd1cb8db2f658cf81cd",
  measurementId: "G-ECTEET2TSC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)