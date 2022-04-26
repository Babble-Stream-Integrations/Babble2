import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
