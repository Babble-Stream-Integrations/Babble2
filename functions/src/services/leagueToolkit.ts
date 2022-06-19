import axios from "axios";
import tmi from "tmi.js";
import {
  getClientId,
  TwitchTokens,
  getStreamerChannel,
  getBotDetails,
} from "./twitchRaffle";
import riot, { riotToken } from "./riot";

interface leagueToolkitsettings {
  allowedCommands: Array<string>;
  chatCommands: { [key: string]: string };
  prefix: string;
  useMyAccount: boolean;
}

console.log(riotToken);
let clientId: string;

async function startLeagueToolkit(
  settings: leagueToolkitsettings,
  tokens: TwitchTokens,
  uniqueString: string,
  PUUID: string
) {
  console.log(settings, tokens);
  console.log("Start league toolkit");
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
      client.say(streamerChannel, `leagueToolkit started!`);
    });

    const summoner = await riot.summonerByPUUID(PUUID);
    const mastery = await riot.masteryBysummonerID(summoner.id);
    const { prefix } = settings;
    const datadragonversionsObject: Array<string> = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const datadragonversion = datadragonversionsObject[0];

    client.on("message", async (channel, tags, message, self) => {
      // Ignore echoed messages.
      if (self) return;

      // check if message starts with prefix
      if (message.slice(0, prefix.length) === prefix) {
        const command = message.slice(prefix.length);

        switch (command) {
          case settings.chatCommands.playerLVL:
            if (settings.allowedCommands.includes("playerLVL")) {
              client.say(
                streamerChannel,
                `Player level: ${summoner.summonerLevel}`
              );
            }
            break;
          case settings.chatCommands.mastery +
            command.slice(settings.chatCommands.mastery.length):
            {
              const champion = command.slice(
                settings.chatCommands.mastery.length
              );
              if (champion === "") {
              }
            }
            break;

          default:
        }
      }
      // if (
      //   message.toLowerCase() === settings.enterMessage &&
      //   !usersEntered.includes(tags["display-name"]!)
      // ) {
      //   const status = await getStatus(
      //     tags.subscriber!,
      //     tags["user-id"]!,
      //     streamerID,
      //     tokens.accessToken
      //   );
      //   const newUsersEntered = calculateNewUsers(
      //     settings,
      //     status,
      //     tags["display-name"]!
      //   );

      //   usersEntered.push(...newUsersEntered);

      //   console.log(status, usersEntered);
      // }
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.message);
      return { error: err.response?.status };
    }
  }
  return { result: "League Toolkit has been succesfully finished!" };
}

export default { startLeagueToolkit };
