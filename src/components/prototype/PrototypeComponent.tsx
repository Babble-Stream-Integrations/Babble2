import React from "react";
import { useState, useEffect } from "react";
import BABswitch from "../library/switch/BABswitch";
import "./PrototypeComponent.css";

type PrototypeTypes = {
  Pmodalshow: boolean;
};

function PrototypeComponent({ Pmodalshow }: PrototypeTypes) {
  // input values saved in states
  const [raffleDuration, setRaffleDuration] = useState(60);
  const [raffleEnterMessage, setRaffleEnterMessage] = useState("!join");
  const [raffleFreeOnly, setRaffleFreeOnly] = useState(false);
  const [rafflePaidOnly, setRafflePaidOnly] = useState(false);
  const [raffleFreePrivilege, setRaffleFreePrivilege] = useState(1);
  const [rafflePaidPrivilege, setRafflePaidPrivilege] = useState(1);
  const [raffleWinnerAmount, setRaffleWinnerAmount] = useState(1);
  const [raffleDuplicateWinners, setRaffleDuplicateWinners] = useState(false);
  const [raffleAnnounceWinners, setRaffleAnnounceWinners] = useState(false);
  const [raffleMyAccount, setRaffleMyAccount] = useState(false);

  // Is the page youtube or not?
  const [isYoutube, setIsYoutube] = useState(false);
  const [isTwitch, setIsTwitch] = useState(true);

  useEffect(() => {
    if (Pmodalshow === false) {
      fetch(
        "default/api/v1/users/" +
          localStorage.getItem("UUID") +
          "/addons/MyRaffleAddon2/settings"
      )
        .then((response) => {
          response.json().then((data) => {
            setRaffleDuration(data["duration"]);
            setRaffleEnterMessage(data["enterMessage"]);
            setRaffleFreeOnly(data["followOnly"]);
            setRafflePaidOnly(data["subOnly"]);
            setRaffleFreePrivilege(data["followPrivilege"]);
            setRafflePaidPrivilege(data["subPrivilege"]);
            setRaffleWinnerAmount(data["winnerAmount"]);
            setRaffleDuplicateWinners(data["duplicateWinners"]);
            setRaffleAnnounceWinners(data["announceWinners"]);
            setRaffleMyAccount(data["useMyAccount"]);
          });
        })
        .catch((err) => {
          console.log("Error reading datat " + err);
        });
    }
  }, [Pmodalshow]);

  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                // fetch("babble-d6ef3/europe-west1/default/api/v1/auth/youtube")
                //   .then((response) =>
                //     response.json().then((data) => {
                //       console.log(data);
                //       alert("login succesfull");
                //       setIsYoutube(true);
                //     })
                //   )
                //   .catch((err) => {
                //     console.log("Error Reading data " + err);
                //     alert("error during login try again");
                //   });
                setIsYoutube(true);
                setIsTwitch(false);
              }}
              disabled={true}
            >
              Authorize Youtube
            </button>
          </div>
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                fetch(
                  "default/api/v1/twitch/auth?user=" +
                    localStorage.getItem("UUID") +
                    "&addon=raffle"
                )
                  .then((response) =>
                    response.json().then((data) => {
                      window.location.href = data.url;
                    })
                  )
                  .catch((err) => {
                    console.log("Error Reading data " + err);
                  });
              }}
            >
              Authorize Twitch
            </button>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Duration</b>
            <div>
              <input
                className="PC-input"
                type="number"
                min={60}
                onChange={(e) => {
                  setRaffleDuration(Number(e.target.value));
                }}
                onBlur={(e) => {
                  if (Number(e.target.value) < 60) {
                    console.log("error");
                    setRaffleDuration(60);
                  }
                }}
                value={raffleDuration}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Enter Message</b>
            <div>
              <input
                className="PC-input"
                type="text"
                onChange={(e) => {
                  setRaffleEnterMessage(e.target.value);
                }}
                value={raffleEnterMessage}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">
              {isYoutube ? "Subscriber only" : "Follower only"}
            </b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleFreeOnly}
                handleToggle={() => setRaffleFreeOnly(!raffleFreeOnly)}
                onColor={"#ff8400"}
                id={"1"}
              />
              <b className="PC-switch-status">{String(raffleFreeOnly)}</b>
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">
              {isYoutube ? "Member Only" : "Subscriber Only"}
            </b>
            <div className="PC-switch">
              <BABswitch
                isOn={rafflePaidOnly}
                handleToggle={() => setRafflePaidOnly(!rafflePaidOnly)}
                onColor={"#ff8400"}
                id={"2"}
              />
              <b className="PC-switch-status">{String(rafflePaidOnly)}</b>
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">
              {isYoutube
                ? "Increased Chance Subscriber"
                : "Increased Chance Follower"}
            </b>
            <div>
              <input
                className="PC-input"
                type="number"
                min={1}
                onChange={(e) => {
                  setRaffleFreePrivilege(Number(e.target.value));
                }}
                onBlur={(e) => {
                  if (Number(e.target.value) < 1) {
                    setRaffleFreePrivilege(1);
                  }
                }}
                value={raffleFreePrivilege}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">
              {isYoutube
                ? "Increased Chance Members"
                : "Increased Chance Subscribers"}
            </b>
            <div>
              <input
                className="PC-input"
                type="number"
                min={1}
                onChange={(e) => {
                  setRafflePaidPrivilege(Number(e.target.value));
                }}
                onBlur={(e) => {
                  if (Number(e.target.value) < 1) {
                    setRafflePaidPrivilege(1);
                  }
                }}
                value={rafflePaidPrivilege}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Amount of Winners</b>
            <div>
              <input
                className="PC-input"
                type="number"
                min={1}
                onChange={(e) => {
                  setRaffleWinnerAmount(Number(e.target.value));
                }}
                onBlur={(e) => {
                  if (Number(e.target.value) < 1) {
                    setRaffleWinnerAmount(1);
                  }
                }}
                value={raffleWinnerAmount}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Duplicate Winner(s)</b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleDuplicateWinners}
                handleToggle={() =>
                  setRaffleDuplicateWinners(!raffleDuplicateWinners)
                }
                onColor={"#ff8400"}
                id={"3"}
              />
              <b className="PC-switch-status">
                {String(raffleDuplicateWinners)}
              </b>
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Announce Winner(s)</b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleAnnounceWinners}
                handleToggle={() =>
                  setRaffleAnnounceWinners(!raffleAnnounceWinners)
                }
                onColor={"#ff8400"}
                id={"4"}
              />
              <b className="PC-switch-status">
                {String(raffleAnnounceWinners)}
              </b>
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">My Account</b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleMyAccount}
                handleToggle={() => setRaffleMyAccount(!raffleMyAccount)}
                onColor={"#ff8400"}
                id={"5"}
              />
              <b className="PC-switch-status">{String(raffleMyAccount)}</b>
            </div>
          </div>
          <div>
            <button
              className="PC-button"
              onClick={() => {
                if (raffleEnterMessage.trim().length !== 0) {
                  fetch(
                    "default/api/v1/users/" +
                      localStorage.getItem("UUID") +
                      "/addons/MyRaffleAddon2/settings",
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        announceWinners: raffleAnnounceWinners,
                        followOnly: raffleFreeOnly,
                        winnerAmount: raffleWinnerAmount,
                        useMyAccount: raffleMyAccount,
                        subOnly: rafflePaidOnly,
                        duplicateWinners: raffleDuplicateWinners,
                        duration: raffleDuration,
                        followPrivilege: raffleFreePrivilege,
                        subPrivilege: rafflePaidPrivilege,
                        enterMessage: raffleEnterMessage,
                      }),
                    }
                  )
                    .then((response) =>
                      response.json().then(() => {
                        alert("Your settings have been saved!");
                      })
                    )
                    .catch((err) => {
                      console.log("Error Reading data " + err);
                      alert(
                        "An error has occured. No panic \nPlease contact the person you got your UUID from!"
                      );
                    });
                } else {
                  alert(
                    "Enter message is empty \nPlease fill in an enter message"
                  );
                }
              }}
            >
              Save Settings
            </button>
          </div>
          <div>
            <button
              className="PC-button"
              onClick={() => {
                alert("Starting Raffle!");
                fetch("default/api/v1/raffle/start", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: localStorage.getItem("UUID"),
                    addon: "MyRaffleAddon2",
                  }),
                })
                  .then((response) =>
                    response.json().then(() => {
                      console.log(response);
                    })
                  )
                  .catch((err) => {
                    console.log("Error Reading data " + err);
                  });
              }}
            >
              Start Raffle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrototypeComponent;
