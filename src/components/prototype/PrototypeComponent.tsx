import React from "react";

import "./prototypecomponent.css";

function PrototypeComponent() {
  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <input type="input" />
          <input type="input" />
          <input type="input" />
          <input type="input" />
        </div>
      </div>
    </div>
  );
}

export default PrototypeComponent;
