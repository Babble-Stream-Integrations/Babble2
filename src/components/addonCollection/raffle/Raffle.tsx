import { onValue, ref } from "firebase/database";
import { rtdb } from "../../../firebase/RealtimeDatabase";
import { useEffect, useState } from "react";
import * as location from "./RaffleLocations";
import { ChooseRaffleAnimation } from "./RaffleAnimation";
import RaffleVisualStart from "./RaffleVisualStart";
import "./Raffle.css";

interface addonTypes {
  data: object;
  dataRecieved: boolean;
}

function Raffle({ dataRecieved, data }: addonTypes) {
  console.log(dataRecieved, data);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const styling = data["styling" as keyof typeof data];
    const raffle = document.getElementById("raffle");
    const canvas = document.getElementById("canvas");
    if (typeof data === "object") {
      for (const [x, y] of Object.entries(styling)) {
        if (typeof y === "string") canvas?.style.setProperty("--" + x, y);
        if (x === "position") {
          for (const [a, b] of Object.entries(location)) {
            if ("P" + y === a) {
              for (const i in b) {
                if (canvas != null) {
                  canvas.style.setProperty(i, b[i as keyof typeof b]);
                }
              }
            }
          }
          // if (typeof y === "string")
          //   raffle?.classList.add(ChooseRaffleAnimation(y.toString()));
        }
      }
      const eventRef = ref(rtdb, data["uniqueString" as keyof typeof data]);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        const eventType = data.type;
        switch (eventType) {
          case "start":
            console.log("startcase");
            // raffle.style.animationPlayState = "running";
            raffle?.style.setProperty("animationPlayState", "running");
            raffle?.style.setProperty("display", "block");
            // setState(1);
            break;
          case "end":
            console.log("endcase");
            break;
          case "idle":
            console.log("idlecase");
            // raffle.style.animationPlayState = "paused";
            raffle?.style.setProperty("animationPlayState", "paused");
            raffle?.style.setProperty("display", "block");
            // setState(2);
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
