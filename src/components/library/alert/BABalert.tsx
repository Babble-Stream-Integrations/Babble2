import { useEffect, useState } from "react";
import * as location from "./BABalertLocations";
import { ChooseAlertAnimation } from "./BABalertAnimation";

import "./BABalert.css";
import { getValue } from "@testing-library/user-event/dist/utils";

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
  const [alertAnimation, setAlertAnimation] = useState("alert-animation-left");

  // useEffect om de correcte positie CSS te geven aan de container
  // Ook om de correcte animate CSS class door te geven aan de alert
  useEffect(() => {
    for (const [x, y] of Object.entries(location)) {
      if (x === Position) {
        setAlertPosition(y);
        setAlertAnimation(ChooseAlertAnimation(x));
      }
    }
  }, []);

  useEffect(() => {
    if (raffleAlertShow === true) {
      setTimeout(() => {
        setRaffleAlertShow(false);
      }, 7000);
    }
  }, [raffleAlertShow]);

  return (
    <div className="alert-container" style={alertPosition}>
      <div
        className={raffleAlertShow ? alertAnimation : "alert-box"}
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
