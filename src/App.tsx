import React from "react";
import { Routes, Route } from "react-router-dom";
import Prototype from "./pages/Prototype";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </div>
  );
}

export default App;
