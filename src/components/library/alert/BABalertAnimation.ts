export function ChooseAlertAnimation(position: string) {
  if (position.match(/Left/g)) return "alert-animation-left";
  if (position.match(/Right/g)) return "alert-animation-right";
  if (position.match(/Top/g)) return "alert-animation-top";
  if (position.match(/Bottom/g)) return "alert-animation-bottom";
  if (position.match(/Center/g)) return "alert-animation-center";
  return "";
}
