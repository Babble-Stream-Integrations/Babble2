export function ChooseAlertAnimation(position: string) {
  if (
    position === "BottomLeft" ||
    position === "TopLeft" ||
    position === "MiddleLeft"
  ) {
    console.log(`"BottomLeft" || "TopLeft" || "MiddleLeft"`);
    return "alert-animation-left";
  } else if (
    position === "BottomRight" ||
    position === "TopRight" ||
    position === "MiddleRight"
  ) {
    console.log(`"BottomRight" || "TopRight" || "MiddleRight"`);
    return "alert-animation-right";
  } else if (position === "TopMiddle") {
    console.log("TopMiddle");
    return "alert-animation-top";
  } else if (position === "BottomMiddle") {
    console.log("BottomMiddle");
    return "alert-animation-bottom";
  } else if (position === "Center") {
    console.log("Center");
    return "alert-animation-center";
  } else {
    return "";
  }
}
