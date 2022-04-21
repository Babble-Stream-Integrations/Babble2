import React from "react";
import { useState, useEffect } from "react";
import PrototypeComponent from "../../components/prototype/PrototypeComponent";
import Prototype_modal from "../../components/prototype_modal/Prototype_modal";

function Prototype() {
  const [Pmodalshow, setPmodalshow] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("UUID") === null) {
      setPmodalshow(true);
      console.log("F");
    } else {
      setPmodalshow(false);
      console.log("testtest");
    }

    const params = window.location.search;
    if (params.trim().length !== 0) {
      const codeParam = new URLSearchParams(params).get("code");
      fetch(
        `http://localhost:5001/babble-d6ef3/europe-west1/default/api/v1/users/${localStorage.getItem(
          "UUID"
        )}/tokens/twitch`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: codeParam,
          }),
        }
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
    }
  }, []);
  return (
    <div className="prototype-container">
      <Prototype_modal Pmodalshow={Pmodalshow} SetPmodalShow={setPmodalshow} />
      <PrototypeComponent Pmodalshow={Pmodalshow} />
    </div>
  );
}

export default Prototype;
