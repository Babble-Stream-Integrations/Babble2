import React from "react";
import { useState } from "react";
import BABswitch from "../library/switch/BABswitch";

import "./prototypecomponent.css";

function PrototypeComponent() {
  const [value, setValue] = useState(false);
  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <div className="PC-button-container">
            <button className="PC-button">Auth Youtube</button>
          </div>
          <div className="PC-button-container">
            <button className="PC-button">Auth Twitch</button>
          </div>
          {/* <div className="PC-input">
            <input type="input" />
          </div>
          <div className="PC-input">
            <input type="input" />
          </div>
          <div className="PC-input">
            <input type="input" />
          </div>
          <div className="PC-input">
            <input type="input" />
          </div> */}
          {/* <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" /> */}
          <div>
            <BABswitch
              isOn={value}
              handleToggle={() => setValue(!value)}
              onColor={"#ff8400"}
              id={"1"}
            />
            {/* <BABswitch
              isOn={true}
              handleToggle={undefined}
              onColor={"ff8400"}
              id={"2"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrototypeComponent;
