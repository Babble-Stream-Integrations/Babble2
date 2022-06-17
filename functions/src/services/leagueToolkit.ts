import axios from "axios";
import tmi from "tmi.js";
import { riotToken } from "./riot";

async function startLeagueToolkit(
  settings: TwitchRaffleSettings,
  tokens: TwitchTokens,
  uniqueString: string
) {
  console.log(settings, tokens);
  console.log("Start Twitch Raffle");
  clientId = await getClientId();

  try {
    const [streamerChannel, streamerID, streamerName, streamerPassword] =
      await getStreamerChannel(tokens.accessToken, tokens.refreshToken);
    const [botName, botPassword] = await getBotDetails();

    const client = new tmi.Client({
      options: {
        debug: true,
      },
      identity: {
        username: settings.useMyAccount ? streamerName : botName,
        password: settings.useMyAccount ? streamerPassword : botPassword,
      },
      channels: [streamerName],
    });

    client.connect().then(() => {
      client.say(
        streamerChannel,
        `Raffle started! Type ${settings.enterMessage} to enter`
      );
      RTDBStart(uniqueString, settings.duration);
      RTDBIdle(uniqueString);
    });

    const usersEntered: string[] = [];

    client.on("message", async (channel, tags, message, self) => {
      // Ignore echoed messages.
      if (self) return;

      if (
        message.toLowerCase() === settings.enterMessage &&
        !usersEntered.includes(tags["display-name"]!)
      ) {
        const status = await getStatus(
          tags.subscriber!,
          tags["user-id"]!,
          streamerID,
          tokens.accessToken
        );
        const newUsersEntered = calculateNewUsers(
          settings,
          status,
          tags["display-name"]!
        );

        usersEntered.push(...newUsersEntered);

        console.log(status, usersEntered);
      }
    });

    setTimeout(() => {
      console.log("Users:", usersEntered);
      const winners = pickWinner(
        usersEntered,
        settings.winnerAmount,
        settings.duplicateWinners
      );
      RTDBEnd(uniqueString, winners);
      RTDBIdle(uniqueString);

      console.log("Winners:", winners);

      if (settings.announceWinners) {
        client.say(
          streamerChannel,
          `The winners of the raffle are: ${winners.join(", ")}`
        );
      }
      client.disconnect();
    }, settings.duration * 1000);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.message);
      return { error: err.response?.status };
    }
  }
  return { result: "Twitch raffle has been succesfully finished!" };
}

export default { startLeagueToolkit };
