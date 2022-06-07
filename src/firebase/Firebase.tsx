import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzNQ2O8_KEF7rcupBT8gNjB0_BIE7K4ig",
  authDomain: "babble-d6ef3.firebaseapp.com",
  databaseURL:
    "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "babble-d6ef3",
  storageBucket: "babble-d6ef3.appspot.com",
  messagingSenderId: "608727980458",
  appId: "1:608727980458:web:02a744b7927fc8b12133d3",
  measurementId: "G-K7MPHMQNH2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
