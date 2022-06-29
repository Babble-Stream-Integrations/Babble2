import React from "react";
import { useState, useEffect } from "react";
import PrototypeComponent from "../../components/prototype/PrototypeComponent";
import PrototypeModal from "../../components/prototypeModal/PrototypeModal";
import BABalert from "../../components/library/alert/BABalert";
import StartRaffleNotification from "../../components/startRaffleNotification/StartRaffleNotification";
import { useLocation } from "react-router-dom";

const uuid = localStorage.getItem("UUID");
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://europe-west1-babble-d6ef3.cloudfunctions.net/default"
    : "http://localhost:5001/babble-d6ef3/europe-west1/default";
const origin =
  process.env.NODE_ENV === "production"
    ? "https://dev-babble.web.app"
    : "http://localhost:3000";

const RaffleAlertStyle = {
  borderRadius: "30px",
  margin: "50px",
  backgroundColor: "var(--offWhiteTwo)",
  // transform: "translateX(1000px)",
};

function Prototype() {
  const [isYoutube, setIsYoutube] = useState(false);
  const [addonName, setAddonName] = useState("");
  const [Pmodalshow, setPmodalshow] = useState(true);
  const [raffleAlertShow, setRaffleAlertShow] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (uuid === null) {
      setPmodalshow(true);
    } else {
      setPmodalshow(false);
    }

    const params = window.location.search;
    if (params.trim().length !== 0) {
      if (location.search.match(/platform=([^&]*)/g)) {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("platform") === "youtube") {
          setIsYoutube(true);
          setAddonName("YoutubeRaffle");
          console.log(searchParams.get("platform"));
        } else if (searchParams.get("platform") === "twitch") {
          setIsYoutube(false);
          setAddonName("MyRaffleAddon2");
        } else {
          window.history.replaceState({}, document.title, "/prototype");
        }
      } else if (location.search.match(/code=([^&]*)/g)) {
        const codeParam = new URLSearchParams(params).get("code");
        fetch(`${baseURL}/api/v1/setAccessTokens/${uuid}/twitch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: codeParam,
          }),
        })
          .then((response) =>
            response.json().then((data) => {
              console.log(data);
              window.history.replaceState({}, document.title, "/prototype");
              alert("login succesfull");
            })
          )
          .catch((err) => {
            console.log("Error Reading data " + err);
            alert("error during login try again");
          });
      } else {
        window.history.replaceState({}, document.title, "/prototype");
      }
    }
  }, []);

  return (
    <div className="prototype-container">
      <PrototypeModal Pmodalshow={Pmodalshow} SetPmodalShow={setPmodalshow} />
      <BABalert
        Position="TopRight"
        ContainerStyle={RaffleAlertStyle}
        raffleAlertShow={raffleAlertShow}
        setRaffleAlertShow={setRaffleAlertShow}
      >
        <StartRaffleNotification />
      </BABalert>
      <PrototypeComponent
        addonName={addonName}
        isYoutube={isYoutube}
        Pmodalshow={Pmodalshow}
        setRaffleAlertShow={setRaffleAlertShow}
      />
    </div>
  );
}

export default Prototype;
