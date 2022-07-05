export function convertWinnerArray(raffleWinners: object) {
  const winners: string[] = [];
  if (typeof raffleWinners !== "undefined")
    Object.entries(raffleWinners).forEach((x) => {
      const winner = Number(x[0]) + 1 + ". " + x[1];
      winners.push(winner);
    });
  else {
    winners.push("Nobody participated");
  }
  return winners;
}
