// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-a82be.firebaseapp.com",
  projectId: "real-estate-a82be",
  storageBucket: "real-estate-a82be.appspot.com",
  messagingSenderId: "1050488985111",
  appId: "1:1050488985111:web:eb1149cc479741602dee52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);