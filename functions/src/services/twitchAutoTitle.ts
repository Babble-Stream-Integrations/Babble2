import axios from "axios";
import { getCurrentSteamGame, getSteamGameAchievementData } from "./steamKit";
import { AuthInfo, AutoTitleSettings, Game, TitleVariables } from "../ts/types";
import { authErrorHandler } from "./twitchAuth";

async function getStreamerId(authInfo: AuthInfo): Promise<string> {
  try {
    const res = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${authInfo.tokens.accessToken}`,
        "Client-Id": authInfo.clientId,
      },
    });
    return res.data.data[0].id;
  } catch (error) {
    return authErrorHandler(error, authInfo, getStreamerId);
  }
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

async function getGameId(
  authInfo: AuthInfo,
  game: string
): Promise<string | undefined> {
  try {
    const res = await axios.get(
      `https://api.twitch.tv/helix/games?name=${game}`,
      {
        headers: {
          Authorization: `Bearer ${authInfo.tokens.accessToken}`,
          "Client-Id": authInfo.clientId,
        },
      }
    );
    return res.data.data[0].id;
  } catch (error) {
    return authErrorHandler(error, authInfo, getGameId);
  }
}

async function changeTitle(
  authInfo: AuthInfo,
  id: string,
  title: string
): Promise<void> {
  try {
    await axios.patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${authInfo.tokens.accessToken}`,
          "Client-Id": authInfo.clientId,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    authErrorHandler(error, authInfo, changeTitle, id, title);
  }
}

async function changeGame(
  authInfo: AuthInfo,
  id: string,
  gameId: string
): Promise<void> {
  try {
    await axios.patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      { game_id: gameId },
      {
        headers: {
          Authorization: `Bearer ${authInfo.tokens.accessToken}`,
          "Client-Id": authInfo.clientId,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    authErrorHandler(error, authInfo, changeGame, id, gameId);
  }
}

async function start(settings: AutoTitleSettings, authInfo: AuthInfo) {
  const streamerId = await getStreamerId(authInfo);
  const steamAPIKey = settings.steamAPIKey ?? "";
  const game: Game = await getCurrentSteamGame(steamAPIKey, settings.steamId);
  if (settings.changeGame) {
    if (game.name || settings.justChatting) {
      if (!game.name) {
        await changeGame(authInfo, streamerId, "509658");
      } else {
        const gameId = await getGameId(authInfo, game.name);
        if (gameId) {
          await changeGame(authInfo, streamerId, gameId);
        }
      }
    }
  }
  if (settings.customTitle && game.name) {
    const title = await generateTitle(
      settings.customTitle,
      game,
      steamAPIKey,
      settings.steamId
    );
    await changeTitle(authInfo, streamerId, title);
  }
}

export default { start };
