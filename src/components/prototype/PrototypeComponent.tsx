import React from "react";
import { useState, useEffect } from "react";
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
  // Initial fetch request
  useEffect(() => {
    console.log("hi");
  }, []);
  useEffect(() => {
    console.log(raffleDuration);
  }, [raffleDuration]);
  return (
    <div className="PC-container">
      <div className="PC-settings-container">
        <div className="PC-grid">
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                fetch("babble-d6ef3/europe-west1/app/api/v1/auth/youtube").then(
                  (response) =>
                    response.json().then((data) => console.log(data))
                );
              }}
            >
              Authorize Youtube
            </button>
          </div>
          <div className="PC-button-container">
            <button
              className="PC-button"
              onClick={() => {
                fetch("babble-d6ef3/europe-west1/app/api/v1/auth/twitch").then(
                  (response) =>
                    response.json().then((data) => console.log(data))
                );
              }}
            >
              Authorize Twitch
            </button>
          </div>
          <div>
            <input
              className="PC-input"
              type="text"
              onChange={(e) => {
                setRaffleDuration(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <input
              className="PC-input"
              type="text"
              onChange={(e) => {
                setRaffleEnterMessage(e.target.value);
              }}
            />
          </div>
          <div className="PC-switch">
            <BABswitch
              isOn={raffleFreeOnly}
              handleToggle={() => setRaffleFreeOnly(!raffleFreeOnly)}
              onColor={"#ff8400"}
              id={"1"}
            />
            <b>{String(raffleFreeOnly)}</b>
          </div>
          <div className="PC-switch">
            <BABswitch
              isOn={rafflePaidOnly}
              handleToggle={() => setRafflePaidOnly(!rafflePaidOnly)}
              onColor={"#ff8400"}
              id={"2"}
            />
            <b>{String(rafflePaidOnly)}</b>
          </div>
          <div>
            <input
              className="PC-input"
              type="text"
              onChange={(e) => {
                setRaffleFreePrivilage(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <input
              className="PC-input"
              type="text"
              onChange={(e) => {
                setRafflePaidPrivilage(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <input
              className="PC-input"
              type="text"
              onChange={(e) => {
                setRaffleWinnerAmount(Number(e.target.value));
              }}
            />
          </div>
          <div className="PC-switch">
            <BABswitch
              isOn={raffleDuplicateWinners}
              handleToggle={() =>
                setRaffleDuplicateWinners(!raffleDuplicateWinners)
              }
              onColor={"#ff8400"}
              id={"3"}
            />
            <b>{String(raffleDuplicateWinners)}</b>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">hi</b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleAnnounceWinners}
                handleToggle={() =>
                  setRaffleAnnounceWinners(!raffleAnnounceWinners)
                }
                onColor={"#ff8400"}
                id={"4"}
              />
              <b>{String(raffleAnnounceWinners)}</b>
            </div>
          </div>
          <div className="PC-setting">
            <b className="PC-uppercase">hi</b>
            <div className="PC-switch">
              <BABswitch
                isOn={raffleMyAccount}
                handleToggle={() => setRaffleMyAccount(!raffleMyAccount)}
                onColor={"#ff8400"}
                id={"4"}
              />
              <b>{String(raffleAnnounceWinners)}</b>
            </div>
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
