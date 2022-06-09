import { onValue, ref } from "firebase/database";
import { rtdb } from "../../../firebase/RealtimeDatabase";
import { useEffect, useState } from "react";
import ticketlogo from "../../../assets/Ticket-icon.png";
import * as location from "./RaffleLocations";
import { ChooseRaffleAnimation } from "./RaffleAnimation";
import "./Raffle.css";

interface addonTypes {
  data: object;
  dataRecieved: boolean;
}

function Raffle({ dataRecieved, data }: addonTypes) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const styling = data["styling"];
    const raffle = document.getElementById("raffle");
    const canvas = document.getElementById("canvas");
    if (typeof data === "object") {
      for (const [x, y] of Object.entries(styling)) {
        canvas.style.setProperty("--" + x, y.toString());
        if (x === "position") {
          for (const [a, b] of Object.entries(location)) {
            if ("P" + y === a) {
              for (const i in b) canvas.style[i] = b[i];
            }
          }
          raffle.classList.add(ChooseRaffleAnimation(y.toString()));
        }
      }
      const eventRef = ref(rtdb, data["uniqueString"]);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        const eventType = data.type;
        switch (eventType) {
          case "start":
            console.log("startcase");
            raffle.style.animationPlayState = "running";
            raffle.style.setProperty("display", "block");
            break;
          case "end":
            console.log("endcase");
            break;
          case "idle":
            raffle.style.animationPlayState = "paused";
            raffle.style.setProperty("display", "none");
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
