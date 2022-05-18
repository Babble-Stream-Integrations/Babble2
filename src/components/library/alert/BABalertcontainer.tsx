import React, { useEffect, useState } from "react";
import * as location from "./BABalertLocations";
import { ChooseAlertAnimation } from "./BABalertAnimation";

import "./BABalert.css";

export const AlertPositionContext = React.createContext<string | undefined>(
  undefined
);

interface BABalertcontainerTypes {
  children: React.ReactNode;
  Position?: string;
}

function BABalertcontainer({ children, Position }: BABalertcontainerTypes) {
  const [alertPosition, setAlertPosition] = useState({});
  const [alertAnimation, setAlertAnimation] = useState("alert-animation-left");
  useEffect(() => {
    for (const [x, y] of Object.entries(location)) {
      if (x === Position) {
        setAlertPosition(y);
        setAlertAnimation(ChooseAlertAnimation(x));
      }
    }
  }, [Position]);

  return (
    <AlertPositionContext.Provider value={alertAnimation}>
      <div className="alert-container" style={alertPosition}>
        {children}
      </div>
    </AlertPositionContext.Provider>
  );
}

export default BABalertcontainer;
