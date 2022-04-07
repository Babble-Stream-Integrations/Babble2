import React from "react";
import { Routes, Route } from "react-router-dom";
import Prototype from "./pages/prototype/Prototype";
import Main_Page from "./pages/main_page/Main_Page";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </div>
  );
}

export default App;
