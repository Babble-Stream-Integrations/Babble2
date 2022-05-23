import React from "react";
import { Routes, Route } from "react-router-dom";
import Prototype from "./pages/prototype/Prototype";
import MainPage from "./pages/mainPage/MainPage";
import AddonPage from "./pages/addonPage/AddonPage";
import InvalidLink from "./pages/invalidLink/InvalidLink";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="/addons" element={<AddonPage />} />
        <Route path="/invalidlink" element={<InvalidLink />} />
      </Routes>
    </div>
  );
}

export default App;
