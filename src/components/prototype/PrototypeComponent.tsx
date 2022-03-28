import React from "react";

import "./prototypecomponent.css";

function PrototypeComponent() {
  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <div>
            <button className="PC-button">Auth Youtube</button>
          </div>
          <button className="PC-button">Auth Twitch</button>
          <input type="input" />
          <input type="input" />
          <input type="input" />
          <input type="input" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}

export default PrototypeComponent;
