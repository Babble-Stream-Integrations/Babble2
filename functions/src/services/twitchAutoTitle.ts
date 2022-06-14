import axios from "axios";
import admin from "firebase-admin";
import { getCurrentSteamGame, getSteamGameAchievementData } from "./steamKit";

const db = admin.firestore();
let clientId: string;

interface TwitchAutoTitleSettings {
  steamId: string;
  steamAPIKey?: string;
  customTitle?: string;
  changeGame: boolean;
  justChatting: boolean;
}

interface TwitchTokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
}

async function getClientId(): Promise<string> {
  const doc = await db.collection("dev").doc("twitchAppDetails").get();
  return doc.data()!.clientId;
}

async function getStreamerId(accessToken: string) {
  try {
    const res = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    });
    return res.data.data[0].id;
  } catch (error) {
    return error;
  }
}

interface TitleVariables {
  gameName: string;
  achievementsTotal: string;
  achievementsAchieved: string;
  achievementsLeft: string;
}

interface Game {
  name: string;
  id: string;
}

async function generateTitle(
  title: string,
  game: Game,
  steamAPIKey: string,
  steamId: string
) {
  const titleVariables: TitleVariables = {
    gameName: game.name,
    achievementsTotal: "",
    achievementsAchieved: "",
    achievementsLeft: "",
  };

  const placeholders = title.match(/(?<=\${)\w+(?=})/g);
  const newTitle = title.split(/\${\w+}/g);

  if (game.name === "" && placeholders?.includes("gameName")) {
    titleVariables.gameName = (
      await getCurrentSteamGame(steamAPIKey, steamId)
    ).name;
  }
  if (placeholders?.some((ph) => /achievements/g.test(ph))) {
    [
      titleVariables.achievementsTotal,
      titleVariables.achievementsAchieved,
      titleVariables.achievementsLeft,
    ] = Object.values(
      await getSteamGameAchievementData(game.id, steamAPIKey, steamId)
    ).map((e) => e.toString());
  }

  placeholders?.forEach((ph, index) =>
    newTitle.splice(
      index * 2 + 1,
      0,
      titleVariables[ph as keyof TitleVariables]
    )
  );
  return newTitle.join("");
}

async function getGameId(accessToken: string, game: string) {
  try {
    const res = await axios.get(
      `https://api.twitch.tv/helix/games?name=${game}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": clientId,
        },
      }
    );
    if (res.data.data.length === 0) {
      return false;
    }
    return res.data.data[0].id;
  } catch (error) {
    return error;
  }
}

async function changeTitle(accessToken: string, id: number, title: string) {
  try {
    await axios.patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": clientId,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function changeGame(accessToken: string, id: number, gameId: number) {
  try {
    await axios.patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      { game_id: gameId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": clientId,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function changeChannelInfo(
  settings: TwitchAutoTitleSettings,
  tokens: TwitchTokens
) {
  if (!settings.changeGame && !settings.customTitle) {
    return {
      result:
        "Twitch autoTitle has been ended without change due to addon settings",
    };
  }
  clientId = await getClientId();
  const { accessToken } = tokens;
  const streamerId = await getStreamerId(accessToken);
  const steamAPIKey =
    typeof settings.steamAPIKey !== "undefined" ? settings.steamAPIKey : "";
  const game: Game = await getCurrentSteamGame(steamAPIKey, settings.steamId);
  if (settings.changeGame) {
    if (game.name || settings.justChatting) {
      const gameId = game.name
        ? await getGameId(accessToken, game.name)
        : 509658;
      await changeGame(accessToken, streamerId, gameId);
    }
  }
  if (settings.customTitle && game.name) {
    const title = await generateTitle(
      settings.customTitle,
      game,
      steamAPIKey,
      settings.steamId
    );
    await changeTitle(accessToken, streamerId, title);
  }
  return { result: "Twitch autoTitle has been ended succesfully!" };
}

export default { changeChannelInfo };
