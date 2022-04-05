import React from "react";
import { useState } from "react";
import BABswitch from "../library/switch/BABswitch";

import "./prototypecomponent.css";

function PrototypeComponent() {
  // input values saved in states
  const [raffleDuration, setRaffleDuration] = useState(60);
  const [raffleEnterMessage, setRaffleEnterMessage] = useState("");
  const [raffleFreeOnly, setRaffleFreeOnly] = useState(false);
  const [rafflePaidOnly, setRafflePaidOnly] = useState(false);
  const [raffleFreePrivilage, setRaffleFreePrivilage] = useState(1);
  const [rafflePaidPrivilage, setRafflePaidPrivilage] = useState(1);
  const [raffleWinnerAmount, setRaffleWinnerAmount] = useState(1);
  const [raffleDuplicateWinners, setRaffleDuplicateWinners] = useState(false);
  const [raffleAnnounceWinners, setRaffleAnnounceWinners] = useState(false);
  const [raffleMyAccount, setRaffleMyAccount] = useState(false);

  // State for start raffle data
  const [raffleStartData, setRaffleStartData] = useState([]);
  const [isYoutube, setIsYoutube] = useState(true);

  // Initial fetch request

  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                fetch(
                  "babble-d6ef3/europe-west1/default/api/v1/users/EBSnlWXow3YeFaWxokmnXIijgkv3"
                )
                  .then((response) =>
                    response.json().then((data) => {
                      console.log(data);
                      alert("login succesfull");
                    })
                  )
                  .catch((err) => {
                    console.log("Error Reading data " + err);
                    alert("error during login try again");
                  });
              }}
            >
              Authorize Youtube
            </button>
          </div>
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                fetch("").then((response) =>
                  response.json().then((data) => console.log(data))
                );
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
                type="text"
                onChange={(e) => {
                  setRaffleDuration(Number(e.target.value));
                }}
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
                type="text"
                onChange={(e) => {
                  setRaffleFreePrivilage(Number(e.target.value));
                }}
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
                type="text"
                onChange={(e) => {
                  setRafflePaidPrivilage(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">Amount of Winners</b>
            <div>
              <input
                className="PC-input"
                type="text"
                onChange={(e) => {
                  setRaffleWinnerAmount(Number(e.target.value));
                }}
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
            <button className="PC-button">Save Settings</button>
          </div>
          <div>
            <button
              className="PC-button"
              onClick={() => {
                fetch("babble-d6ef3/europe-west1/app/api/v1/raffle/start", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(raffleStartData),
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
