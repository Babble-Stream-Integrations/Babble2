import "./StartRaffleNotification.css";
import ticketlogo from "../../assets/Ticket-icon.png";

const StartRaffleNotification = () => {
  return (
    <>
      <div className="SRN-content">
        <div className="SRN-icon">
          <img
            src={ticketlogo}
            alt="temporary 1:1 aspect ratio"
            className="SRN-image"
          />
        </div>
        <div className="SRN-text">
          <div className="SRN-title">
            raffle <b>starting</b>!
          </div>
          <div className="SRN-subtitle">
            Use <b>/join</b> to enter.
          </div>
        </div>
      </div>
    </>
  );
};

export default StartRaffleNotification;
