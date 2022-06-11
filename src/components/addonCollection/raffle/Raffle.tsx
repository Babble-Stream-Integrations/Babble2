import { onValue, ref } from "firebase/database";
import { rtdb } from "../../../firebase/RealtimeDatabase";
import { Children, useEffect, useState } from "react";
import * as location from "./RaffleLocations";
import { ChooseRaffleAnimation } from "./RaffleAnimation";
import RaffleVisualStart from "./RaffleVisualStart";
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
          <RaffleVisualStart />
        </div>
      </div>
    </>
  );
}

export default Raffle;
