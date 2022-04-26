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
  // useEffect om de correcte positie CSS te geven aan de container
  useEffect(() => {
    for (const [x, y] of Object.entries(location)) {
      if (x === Position) {
        setAlertPosition(y);
      }
    }
  }, []);

  return (
    <div className="alert-container" style={alertPosition}>
      <div className="alert-box" style={ContainerStyle}>
        {children}
      </div>
    </div>
  );
}

export default BABalert;
