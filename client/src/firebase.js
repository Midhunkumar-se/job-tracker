// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-tracker-8148b.firebaseapp.com",
  projectId: "job-tracker-8148b",
  storageBucket: "job-tracker-8148b.appspot.com",
  messagingSenderId: "1772321246",
  appId: "1:1772321246:web:43181e37b30b49ffa9054f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
