export function convertWinnerArray(raffleWinners: object) {
  const winners: string[] = [];
  Object.entries(raffleWinners).forEach((x) => {
    const winner = Number(x[0]) + 1 + ". " + x[1];
    winners.push(winner);
  });
  return winners;
}
