import React from "react";
import { Routes, Route } from "react-router-dom";
import AddonPage from "./pages/addonPage/AddonPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddonPage />} />
      </Routes>
    </div>
  );
}

export default App;
