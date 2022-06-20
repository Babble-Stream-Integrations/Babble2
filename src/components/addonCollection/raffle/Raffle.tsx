import { onValue, ref } from "firebase/database";
import { rtdb } from "../../../firebase/RealtimeDatabase";
import { useEffect, useState } from "react";
import * as location from "./RaffleLocations";
import { ChooseRaffleAnimation } from "./RaffleAnimation";
import RaffleVisualStart from "./RaffleVisualStart";
import "./Raffle.css";
import RaffleVisualCountdown from "./RaffleVisualCountdown";

interface addonTypes {
  data: object;
  dataRecieved: boolean;
}

function Raffle({ dataRecieved, data }: addonTypes) {
  const [state, setState] = useState(0);
  const [time, setTime] = useState(60);
  useEffect(() => {
    console.log(state);
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
                  // Gebruik canvas.style[x] = y in plaast van
                  // setProperty, anders veranderd ie niet meteen
                  // op het scherm
                  canvas.style[i as unknown as number] = b[i as keyof typeof b];
                }
              }
            }
          }
          if (typeof y === "number") {
            raffle?.classList.add(ChooseRaffleAnimation(y.toString()));
          }
        }
      }
      const animationClass = raffle?.classList[1];
      const eventRef = ref(rtdb, data["uniqueString" as keyof typeof data]);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        const eventType = data.type;
        switch (eventType) {
          case "start":
            console.log("startcase");
            raffle?.style.setProperty("animation-play-state", "running");
            raffle?.style.setProperty("display", "flex");
            // Timeout to start the countdown visual
            setTimeout(() => {
              raffle?.classList.remove(animationClass);
              raffle?.style.setProperty("display", "none");
              raffle?.style.removeProperty("animation-play-state");
              // Triggered een reflow van CSS waardoor de 2de animatie kan starten.
              raffle?.offsetWidth;
              setState(1);
              const animationDuration = time + 3;
              raffle?.style.setProperty(
                "animation-delay",
                "0s, " + animationDuration + "s"
              );
              raffle?.classList.add(animationClass);
              raffle?.style.setProperty("animation-play-state", "running");
              raffle?.style.setProperty("display", "flex");
            }, 7000);
            break;
          case "end":
            setState(2);
            console.log("endcase");
            break;
          case "idle":
            console.log("idlecase");
            raffle?.style.setProperty("animation-play-state", "paused");
            raffle?.style.setProperty("display", "none");
            raffle?.style.removeProperty(animationClass);
            raffle?.style.removeProperty("animation-delay");
            setState(0);
            break;
        }
      });
    }
  }, [dataRecieved]);
  return (
    <>
      <div id="canvas" className="canvas">
        <div id="raffle" className="raffle">
          {
            {
              0: <RaffleVisualStart />,
              1: <RaffleVisualCountdown time={time} />,
            }[state]
          }
        </div>
      </div>
    </>
  );
}

export default Raffle;
