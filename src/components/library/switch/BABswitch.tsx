import React, { ChangeEventHandler, useEffect } from "react";
import "./BABswitch.css";

type BABswitchProps = {
  isOn?: boolean;
  handleToggle?: ChangeEventHandler<HTMLInputElement>;
  onColor?: string;
  id: string;
};
// changeventhandler<htmlinputelement>
function BABswitch({ isOn, handleToggle, onColor, id }: BABswitchProps) {
  useEffect(() => {
    console.log(isOn);
    console.log(onColor);
    console.log(document.querySelector("label"));
  });
  return (
    <>
      <input
        defaultChecked={isOn}
        type="checkbox"
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={id}
      />
      <label
        style={{ backgroundColor: isOn ? onColor : "" }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

BABswitch.defaultProps = {
  isOn: false,
  handleToggle: undefined,
  onColor: "ff8400",
  id: 1,
};

export default BABswitch;
