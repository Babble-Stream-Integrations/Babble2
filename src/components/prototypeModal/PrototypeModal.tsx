import React from "react";
import { useState } from "react";

import "./Prototype_modal.css";

type Prototype_modal = {
  Pmodalshow: boolean;
  SetPmodalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function Prototype_modal({ Pmodalshow, SetPmodalShow }: Prototype_modal) {
  const [inputUUID, setInputUUID] = useState("");
  return (
    <>
      <div
        className="P-modal"
        style={{ display: Pmodalshow ? "block" : "none" }}
      >
        <div className="P-overlay"></div>
        <div className="P-modal-container">
          {/* Content Modal */}
          <div className="P-modal-head">
            <h2>Fill in your UUID</h2>
          </div>
          <div className="P-modal-content">
            <input
              type="text"
              className="P-modal-input"
              onChange={(e) => {
                setInputUUID(e.target.value);
              }}
            />
          </div>
          <div className="P-modal-submit">
            <button
              className="P-modal-button"
              onClick={() => {
                if (inputUUID.trim().length !== 0) {
                  fetch(
                    "https://europe-west1-babble-d6ef3.cloudfunctions.net/default/api/v1/users/" +
                      inputUUID,
                    {
                      headers: {
                        Origin: "http://localhost:3000",
                      },
                    }
                  )
                    .then((response) => {
                      if (response.ok) {
                        SetPmodalShow(false);
                        // Test id EBSnlWXow3YeFaWxokmnXIijgkv3
                        localStorage.setItem("UUID", inputUUID);
                      } else {
                        alert(
                          "UUID is incorrect \nPlease try again or use a different UUID"
                        );
                      }
                      // response.json().then((data) => {
                      //   console.log(data);
                      //   console.log(response);
                      // })
                    })
                    .catch((err) => {
                      console.log("Error Reading data " + err);
                      alert(
                        "There has been an error regarding the server \nPlease contact us"
                      );
                    });
                } else {
                  alert("Fill in a UUID");
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prototype_modal;
