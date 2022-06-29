import { youtube_v3 as ytV3 } from "googleapis";
import { getCurrentSteamGame, getSteamGameAchievementData } from "./steamKit";
import { AuthInfo, AutoTitleSettings, Game, TitleVariables } from "../ts/types";
import { makeYoutubeClient } from "./youtubeAuth";

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

async function getBroadcast(youtubeClient: ytV3.Youtube) {
  const res = await youtubeClient.liveBroadcasts.list({
    part: ["snippet"],
    broadcastStatus: "active",
  });
  const id = res.data.items?.[0]?.id;
  const scheduledStartTime = res.data.items?.[0].snippet?.scheduledStartTime;
  if (!id || !scheduledStartTime) throw new Error("No active stream found");
  return [id, scheduledStartTime];
}

async function changeTitle(youtubeClient: ytV3.Youtube, title: string) {
  const [id, scheduledStartTime] = await getBroadcast(youtubeClient);
  await youtubeClient.liveBroadcasts.update({
    part: ["snippet"],
    requestBody: {
      id,
      snippet: {
        title,
        scheduledStartTime,
      },
    },
  });
}

async function start(settings: AutoTitleSettings, authInfo: AuthInfo) {
  const youtubeClient = await makeYoutubeClient(authInfo);
  const steamAPIKey = settings.steamAPIKey ?? "";
  const game: Game = await getCurrentSteamGame(steamAPIKey, settings.steamId);
  if (settings.customTitle) {
    const title = await generateTitle(
      settings.customTitle,
      game,
      steamAPIKey,
      settings.steamId
    );
    await changeTitle(youtubeClient, title);
  }
}

export default { start };
