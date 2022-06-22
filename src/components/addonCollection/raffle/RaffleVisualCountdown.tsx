import React, { useEffect, useState } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

interface RaffleCountdownTypes {
  time: number;
}

function RaffleVisualCountdown({ time }: RaffleCountdownTypes) {
  const [currentTime, setCurrentTime] = useState(time);
  const [display, setDisplay] = useState("0:00");

  // Zet de initiële tijd in de visual
  useEffect(() => {
    const min = Math.floor(time / 60);
    const presec = time % 60;
    let sec: string;
    if (presec < 10) {
      sec = "0" + presec;
    } else sec = presec.toString();
    setDisplay(min + ":" + sec);
  }, []);

  // Telt af en displayed de timer als minuten : secondes
  useEffect(() => {
    const countdown = setTimeout(() => {
      const min = Math.floor(currentTime / 60);
      const presec = currentTime % 60;
      let sec: string;
      if (presec < 10) {
        sec = "0" + presec;
      } else sec = presec.toString();
      setDisplay(min + ":" + sec);
      setCurrentTime(currentTime - 1);
    }, 1000);
    if (currentTime < 0) {
      clearTimeout(countdown);
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
          <div className="raffle__subtitle">Time left:</div>
          <div className="raffle__countdown">{display}</div>
        </div>
      </div>
    </>
  );
}

export default RaffleVisualCountdown;
