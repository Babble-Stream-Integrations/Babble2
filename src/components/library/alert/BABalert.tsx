import { useEffect } from "react";
import { AlertPositionContext } from "./BABalertcontainer";

import "./BABalert.css";

interface BABalertTypes {
  ContainerStyle?: object;
  children?: React.ReactNode;
  raffleAlertShow: boolean;
  setRaffleAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
  alertAnimation?: string;
}

function BABalert({
  children,
  ContainerStyle,
  raffleAlertShow,
  setRaffleAlertShow,
}: BABalertTypes) {
  useEffect(() => {
    if (raffleAlertShow === true) {
      setTimeout(() => {
        setRaffleAlertShow(false);
      }, 7000);
    }
  }, [raffleAlertShow, setRaffleAlertShow]);

  return (
    <AlertPositionContext.Consumer>
      {(alertAnimation) => {
        return (
          <div
            className={raffleAlertShow ? alertAnimation : "alert-box"}
            style={ContainerStyle}
          >
            {children}
          </div>
        );
      }}
    </AlertPositionContext.Consumer>
  );
}

export default BABalert;
