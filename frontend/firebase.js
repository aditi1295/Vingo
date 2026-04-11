// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vingo-39fb8.firebaseapp.com",
  projectId: "vingo-39fb8",
  storageBucket: "vingo-39fb8.firebasestorage.app",
  messagingSenderId: "901445760259",
  appId: "1:901445760259:web:7a19e064cce97e455d6536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);

export  {app,auth};

// google se signup krvane ke liye firebase ka 
// use kr rhe h taki user apne google account se signup kr ske aur uska data
//  hamare database me save ho jaye aur usko login kr diya jaye
