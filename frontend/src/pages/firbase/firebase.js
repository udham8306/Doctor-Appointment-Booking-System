// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApPZlRBJJAOhDMuHFe6axUP31jIU18ruE",
    authDomain: "doctor-appointment-df072.firebaseapp.com",
    projectId: "doctor-appointment-df072",
    storageBucket: "doctor-appointment-df072.appspot.com",
    messagingSenderId: "1076147850952",
    appId: "1:1076147850952:web:7b451af6ff9749803c5ffd",
    measurementId: "G-4LLYV7RX9C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set up Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
