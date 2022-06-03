import { onValue, ref } from "firebase/database";
import { rtdb } from "../../../firebase/RealtimeDatabase";
import { useEffect, useState } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import "./Raffle.css";
import { ChooseRaffleAnimation } from "./RaffleAnimation";

interface addonTypes {
  data: object;
  dataRecieved: boolean;
}

function Raffle({ dataRecieved, data }: addonTypes) {
  const [render, setRender] = useState(false);
  const [raffleAnimation, setRaffleAnimation] = useState(
    "alert-animation-left"
  );
  useEffect(() => {
    const styling = data["styling"];
    if (typeof data === "object") {
      for (const [x, y] of Object.entries(styling)) {
        document
          .getElementById("canvas")
          .style.setProperty("--" + x, y.toString());
        // if (x === "position") {
        //   document
        //     .getElementById("raffle")
        //     .classList.add(ChooseRaffleAnimation(y.toString()));
        // }
      }
      console.log(data["uniqueString  "]);
      const eventRef = ref(rtdb, data["uniqueString"]);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        const eventType = data.type;
        switch (eventType) {
          case "start":
            console.log("startcase");
            document
              .getElementById("raffle")
              .style.setProperty("display", "block");
            break;
          case "end":
            document
              .getElementById("raffle")
              .style.setProperty("display", "none");
            console.log("endcase");
            break;
          case "idle":
            console.log("idlecase");
            break;
        }
      });
    }
  }, [dataRecieved]);
  return (
    <>
      <div id="canvas" className="canvas">
        <div id="raffle" className="raffle">
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
    </>
  );
}

export default Raffle;
