import React from "react";
import { useState } from "react";
import PrototypeComponent from "../components/prototype/PrototypeComponent";
import Prototype_modal from "../components/prototype_modal/Prototype_modal";

function Prototype() {
  const [Pmodalshow, setPmodalshow] = useState(false);
  return (
    <div className="prototype-container">
      <Prototype_modal Pmodalshow={Pmodalshow} />
      <PrototypeComponent />
    </div>
  );
}

export default Prototype;