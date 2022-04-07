import React from "react";
import { Routes, Route } from "react-router-dom";
import AddonPage from "./pages/addon_page/AddonPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/addonpage" element={<AddonPage />} />
      </Routes>
    </div>
  );
}

export default App;
