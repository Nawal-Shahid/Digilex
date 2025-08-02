// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqz8YzmsOaJ1aByOME5JlxMKKrjk24UzU",
  authDomain: "signup-79eaa.firebaseapp.com",
  projectId: "signup-79eaa",
  storageBucket: "signup-79eaa.firebasestorage.app",
  messagingSenderId: "163324961873",
  appId: "1:163324961873:web:846220c695f327f1f30470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

