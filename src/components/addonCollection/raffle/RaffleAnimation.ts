export function ChooseRaffleAnimation(position: string) {
  if (position.match(/\b0/g)) return "alert-animation-left";
  if (position.match(/\b2/g)) return "alert-animation-right";
  if (position.match(/10/g)) return "alert-animation-top";
  if (position.match(/12/g)) return "alert-animation-bottom";
  if (position.match(/11/g)) return "alert-animation-center";
  return "";
}
