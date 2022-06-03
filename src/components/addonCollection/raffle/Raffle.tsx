import { useEffect } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

interface addonTypes {
  data: object;
  dataRecieved: boolean;
}

function Raffle({ dataRecieved, data }: addonTypes) {
  useEffect(() => {
    console.log(data["styling"]);
    if (typeof data === "object") {
      Object.keys(data["styling"]).forEach((x) => {
        console.log(x);
      });
    }
  }, [dataRecieved]);
  return (
    <div className="canvas">
      <div className="raffle">
        <div className="raffle__container">
          <div className="raffle__logo">
            <img
              src={ticketlogo}
              alt="Ticket logo Raffle"
              className="raffle__img"
            />
          </div>
          <div className="raffle__text">
            <div className="raffle__title">
              Raffle <b>starting</b>!
            </div>
            <div className="raffle__subtitle">
              Use <b>/join</b> to enter.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Raffle;
