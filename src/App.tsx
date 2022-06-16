import React from "react";
import { Routes, Route } from "react-router-dom";
import Prototype from "./pages/prototype/Prototype";
import MainPage from "./pages/mainPage/MainPage";
import AddonPage from "./pages/addonPage/AddonPage";
// import AddonVisual from "./pages/addonVisualPage/AddonVisual";
// import InvalidLink from "./pages/invalidLink/InvalidLink";
import "./App.css";
import InfoPage from "./pages/infoPage/InfoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="/addons" element={<AddonPage />} />
        <Route path="/addons/:cardTitle" element={<InfoPage />} />
        {/* <Route path="/overlay/raffle" element={<AddonVisual />} />
        <Route path="/invalidlink" element={<InvalidLink />} /> */}
      </Routes>
    </div>
  );
}

export default App;
