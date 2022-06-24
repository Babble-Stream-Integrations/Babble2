import React from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

function RaffleVisualStart() {
  return (
    <>
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
    </>
  );
}

export default RaffleVisualStart;
