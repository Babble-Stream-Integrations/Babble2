import { time } from "console";
import React, { useEffect, useState } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

function RaffleVisualCountdown() {
  const [time, setTime] = useState(60);
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
          <div className="raffle__subtitle">Time remaining:</div>
          <div className="raffle__title">{time}</div>
        </div>
      </div>
    </>
  );
}

export default RaffleVisualCountdown;
