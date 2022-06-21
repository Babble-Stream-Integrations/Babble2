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

interface champions {
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
    const totalMastery = await riot.totalMasteryBysummonerID(summoner.id);
    const { prefix } = settings;
    const datadragonversionsObject: Array<string> = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const datadragonversion = datadragonversionsObject[0];
    const champions: { [key: string]: champions } = (
      await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/${datadragonversion}/data/en_US/champion.json`
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
                settings.chatCommands.mastery.length
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
                  (o) => Number(o.key) === championID
                )!.name;
                client.say(
                  streamerChannel,
                  `Mastery ${champion}: ${maxMastery}, Total mastery: ${totalMastery}`
                );
              } else {
                const championID = championsArray.find(
                  (o) => o.name.toLowerCase === champion.toLowerCase
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
                // active game stuff
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
