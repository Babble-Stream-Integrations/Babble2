import Sse from "./serverSentEvents";

interface TwitchRaffleSettings {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  memberOnly: boolean;
  memberPrivilege: number;
  subOnly: boolean;
  subPrivilege: number;
  useMyAccount: boolean;
  winnerAmount: number;
}

interface TwitchTokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
}

async function startRaffle(
  settings: TwitchRaffleSettings,
  tokens: TwitchTokens
) {
  console.log(settings, tokens);
  Sse.end("m3jUxL2oFnmCEnAxsUYfzjcEb05RpGoZ", ["test", "hello"]);
}

export default { startRaffle };
