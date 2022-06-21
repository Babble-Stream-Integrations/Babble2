import axios from "axios";
import { getCurrentSteamGame, getSteamGameAchievementData } from "./steamKit";
import { getTwitchAppDetails } from "../db/devDb";
import {
  AutoTitleSettings,
  Game,
  TitleVariables,
  TwitchTokens,
} from "../ts/types";

let clientId: string;

async function getStreamerId(accessToken: string) {
  const res = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId,
    },
  });
  return res.data.data[0].id;
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
}

async function changeTitle(accessToken: string, id: number, title: string) {
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
}

async function changeGame(accessToken: string, id: number, gameId: number) {
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
}

async function start(settings: AutoTitleSettings, tokens: TwitchTokens) {
  clientId = (await getTwitchAppDetails()).clientId;
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
}

export default { start };
