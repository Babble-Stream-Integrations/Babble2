import { useEffect, useState } from "react";
import * as location from "./BABalertLocations";

import "./BABalert.css";

interface BABalertTypes {
  Position?: string;
  ContainerStyle?: object;
  children?: React.ReactNode;
}

function BABalert({ Position, children, ContainerStyle }: BABalertTypes) {
  const [alertPosition, setAlertPosition] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);

  // useEffect om de correcte positie CSS te geven aan de container
  useEffect(() => {
    for (const [x, y] of Object.entries(location)) {
      if (x === Position) {
        setAlertPosition(y);
      }
    }
  }, []);

  useEffect(() => {
    if (alertVisible === true) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 6000);
    }
  }, [alertVisible]);

  return (
    <div className="alert-container" style={alertPosition}>
      <div
        className={alertVisible ? "alert-animation" : "alert-box"}
        style={ContainerStyle}
      >
        {children}
      </div>
      <button
        onClick={() => {
          setAlertVisible(!alertVisible);
          console.log(alertVisible);
        }}
        style={{ pointerEvents: "all" }}
      >
        TEST
      </button>
    </div>
  );
}

export default BABalert;
