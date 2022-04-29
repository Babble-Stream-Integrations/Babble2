import { useEffect, useState } from "react";
import * as location from "./BABalertLocations";

import "./BABalert.css";

interface BABalertTypes {
  Position?: string;
  ContainerStyle?: object;
  children?: React.ReactNode;
  raffleAlertShow: boolean;
  setRaffleAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function BABalert({
  Position,
  children,
  ContainerStyle,
  raffleAlertShow,
  setRaffleAlertShow,
}: BABalertTypes) {
  const [alertPosition, setAlertPosition] = useState({});

  // useEffect om de correcte positie CSS te geven aan de container
  useEffect(() => {
    for (const [x, y] of Object.entries(location)) {
      if (x === Position) {
        setAlertPosition(y);
      }
    }
  }, []);

  useEffect(() => {
    if (raffleAlertShow === true) {
      setTimeout(() => {
        setRaffleAlertShow(false);
      }, 6000);
    }
  }, [raffleAlertShow]);

  return (
    <div className="alert-container" style={alertPosition}>
      <div
        className={raffleAlertShow ? "alert-animation" : "alert-box"}
        style={ContainerStyle}
      >
        {children}
      </div>
      {/* <button
        onClick={() => {
          setRaffleAlertShow(!raffleAlertShow);
          console.log(raffleAlertShow);
        }}
        style={{ pointerEvents: "all" }}
      >
        TEST
      </button> */}
    </div>
  );
}

export default BABalert;
