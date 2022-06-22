import axios from "axios";
import { getSteamDetails } from "../db/devDb";
import { Achievement } from "../ts/types";

async function getCurrentSteamGame(steamAPIKey: string, steamId: string) {
  const steamApiKey =
    steamAPIKey !== "" ? steamAPIKey : (await getSteamDetails()).steamWebAPIKey;
  const steamCurrentGame = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;
  const response = await axios.get(steamCurrentGame);
  if ("gameid" in response.data.response.players[0]) {
    return {
      name: response.data.response.players[0].gameextrainfo,
      id: response.data.response.players[0].gameid,
    };
  }
  return { name: "", id: "" };
}

async function getSteamGameAchievementData(
  gameId: string,
  steamAPIKey: string,
  steamId: string
) {
  const steamApiKey =
    steamAPIKey !== "" ? steamAPIKey : (await getSteamDetails()).steamWebAPIKey;
  try {
    const achievementsRequest = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&key=${steamApiKey}&steamid=${steamId}`;
    const response = await axios.get(achievementsRequest);
    const totalAchievements: Achievement[] =
      response.data.playerstats.achievements;
    const achievedAchievements = totalAchievements.filter((i) => i.achieved);
    return {
      achievementsTotal: totalAchievements.length,
      achievementsAchieved: achievedAchievements.length,
      achievementsLeft: totalAchievements.length - achievedAchievements.length,
    };
  } catch (error) {
    console.error(error);
    return {
      achievementsAchieved: 0,
      achievementsTotal: 0,
      achievementsLeft: 0,
    };
  }
}

export { getCurrentSteamGame, getSteamGameAchievementData };
