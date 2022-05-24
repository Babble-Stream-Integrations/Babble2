import React from "react";
import logo from "../../assets/logo/Babble-Small-Transparant.png";
import "./InvalidLink.css";

const InvalidLink = () => {
  return (
    <div className="IL-container">
      <div className="IL-content">
        <div className="IL-text-container">
          <img className="IL-text-logo" src={logo} alt="Babble logo" />
          <p className="IL-text-paragraph IL-text-head">
            The url you&apos;ve tried to acces is{" "}
            <b className="IL-text-paragrahp-invalid">invalid</b>.
          </p>
          <p className="IL-text-paragraph">
            Please check the URL for mistakes and try again.
          </p>
          <p className="IL-text-returnBtn">
            <a href="https://babble.streamintegrations.com">
              <button type="button" className="IL-returnBtn">
                <b>Return to main page</b>
              </button>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvalidLink;
