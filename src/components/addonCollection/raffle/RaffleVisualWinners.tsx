import React from "react";
import { useEffect } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

interface RaffleVisualWinnersTypes {
  raffleWinners: object;
}

function RaffleVisualWinners({ raffleWinners }: RaffleVisualWinnersTypes) {
  useEffect(() => {
    Object.entries(raffleWinners).forEach((x) => {
      console.log(Number(x[0]) + 1 + ". " + x[1]);
    });
  });
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
            Raffle <b>Finished</b>!
          </div>
          <div className="raffle__subtitle">
            Here are the <b>winners</b>:
          </div>
          <div className="raffle__winners">{}</div>
        </div>
      </div>
    </>
  );
}

export default RaffleVisualWinners;
