import React from "react";
import { useState } from "react";

import "./Prototype_modal.css";

type Prototype_modal = {
  Pmodalshow: boolean;
};

function Prototype_modal({ Pmodalshow }: Prototype_modal) {
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
            <input type="text" className="P-modal-input" />
          </div>
          <div className="P-modal-submit">
            <button className="P-modal-button">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prototype_modal;
