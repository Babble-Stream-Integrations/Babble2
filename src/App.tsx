import React from "react";
import { Routes, Route } from "react-router-dom";
import Prototype from "./pages/prototype/Prototype";
import MainPage from "./pages/mainPage/MainPage";
import AddonPage from "./pages/addonPage/AddonPage";
import AddonVisual from "./pages/addonVisualPage/AddonVisual";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="/addons" element={<AddonPage />} />
        <Route path="/overlay/raffle" element={<AddonVisual />} />
      </Routes>
    </div>
  );
}

export default App;
