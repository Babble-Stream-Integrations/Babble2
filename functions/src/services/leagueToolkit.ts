import axios from "axios";
import tmi from "tmi.js";
import { getClientId, TwitchTokens, getBotDetails } from "./twitchRaffle";
import riot /* , { riotToken } */ from "./riot";
import { refreshAccessToken } from "./twitchAuth";

interface leagueToolkitsettings {
  allowedCommands: Array<string>;
  chatCommands: { [key: string]: string };
  prefix: string;
  useMyAccount: boolean;
}

interface Champions {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: Array<string>;
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
}

interface Queue {
  queueId: number;
  map: string;
  description: string | null;
  notes: string | null;
}

let clientId: string;

async function getStreamerChannel(
  accessToken: string,
  refreshToken: string
): Promise<string[]> {
  try {
    const res = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    });

    const streamerChannel: string = `#${res.data.data[0].login}`;
    const streamerID: string = res.data.data[0].id;
    const streamerName: string = res.data.data[0].login;
    const streamerPassword: string = `oauth:${accessToken}`;
    return [streamerChannel, streamerID, streamerName, streamerPassword];
  } catch (err) {
    try {
      const [newAccessToken, newrefreshToken] = await refreshAccessToken(
        refreshToken
      );
      return await getStreamerChannel(newAccessToken, newrefreshToken);
    } catch (refreshErr) {
      if (axios.isAxiosError(err)) {
        throw err;
      }
    }
    throw new Error("Couldn't get Twitch user");
  }
}

async function startLeagueToolkit(
  settings: leagueToolkitsettings,
  tokens: TwitchTokens,
  uniqueString: string,
  PUUID: string
) {
  console.log(settings, tokens);
  console.log("Start league toolkit");
  clientId = await getClientId();

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

  const totalMastery = await riot.totalMasteryBysummonerID(summoner.id);
  const { prefix } = settings;
  const datadragonversionsObject: Array<string> = (
    await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
  ).data;
  const datadragonversion = datadragonversionsObject[0];
  const champions: { [key: string]: Champions } = (
    await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${datadragonversion}/data/en_US/champion.json`
    )
  ).data.data;
  const queues: Array<Queue> = (
    await axios.get(
      "https://static.developer.riotgames.com/docs/lol/queues.json"
    )
  ).data;
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
          if (settings.allowedCommands.includes("mastery")) {
            let champion = command.slice(
              settings.chatCommands.mastery.length + 1
            );

            const championsArray = Object.values(champions);
            if (champion === "") {
              // neccesary because input is an array
              // eslint-disable-next-line prefer-spread
              const maxMastery = Math.max.apply(
                Math,
                mastery.map((o) => o.championPoints)
              );
              const masteryChamp = mastery.find(
                (o) => o.championPoints === maxMastery
              )!;
              const championID = masteryChamp.championId;

              champion = championsArray.find(
                (o) => o.key === String(championID)
              )!.name;
              client.say(
                streamerChannel,
                `Mastery ${champion}: ${maxMastery}, Total mastery: ${totalMastery}`
              );
            } else {
              const championID = championsArray.find(
                (o) => o.name.toLowerCase() === champion.toLowerCase()
              )!.key;
              const masteryChamp = mastery.find(
                (o) => Number(championID) === o.championId
              )!;
              client.say(
                streamerChannel,
                `Mastery ${champion}: ${masteryChamp.championPoints}, Total mastery: ${totalMastery}`
              );
            }
          }
          break;
        case settings.chatCommands.gameType:
          if (settings.allowedCommands.includes("gametype")) {
            const activeGame = await riot.LOLActiveGame(summoner.id);
            if (typeof activeGame === "string") {
              client.say(streamerChannel, activeGame);
            } else {
              const queue: Queue = queues.find(
                (o) => activeGame.gameQueueConfigId === o.queueId
              )!;
              if (queue.description !== null) {
                client.say(
                  streamerChannel,
                  `Game type: ${queue.description.replace("games", "")}`
                );
              } else {
                client.say(streamerChannel, `Game type: ${queue.map}`);
              }
            }
          }
          break;
        case "stop":
          if (tags["display-name"] === streamerName) {
            client.say(streamerChannel, "league toolkit has disconnected");
            client.disconnect();
          }
          break;

        default:
      }
    }
  });
}

export default { startLeagueToolkit };
