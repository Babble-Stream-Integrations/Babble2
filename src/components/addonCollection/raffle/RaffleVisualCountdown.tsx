import React, { useEffect, useState } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

interface RaffleCountdownTypes {
  time: number;
}

function RaffleVisualCountdown({ time }: RaffleCountdownTypes) {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (currentTime >= 1) {
      countdownInterval = setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else {
      clearTimeout(countdownInterval);
    }
  }, [currentTime]);

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
          <div className="raffle__title">{currentTime}</div>
        </div>
      </div>
    </>
  );
}

export default RaffleVisualCountdown;
