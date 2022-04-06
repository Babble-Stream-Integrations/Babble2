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
  }, []);
  return (
    <div className="prototype-container">
      <Prototype_modal Pmodalshow={Pmodalshow} SetPmodalShow={setPmodalshow} />
      <PrototypeComponent Pmodalshow={Pmodalshow} />
    </div>
  );
}

export default Prototype;
