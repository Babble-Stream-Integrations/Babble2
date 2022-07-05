import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";

interface RaffleVisualWinnersTypes {
  raffleWinners: string[];
}

function RaffleVisualWinners({ raffleWinners }: RaffleVisualWinnersTypes) {
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
          <div className="raffle__winners">
            {raffleWinners.map((a, i) => (
              <p key={i}>{a}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RaffleVisualWinners;
