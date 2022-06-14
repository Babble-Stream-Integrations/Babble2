import axios from "axios";
import admin from "firebase-admin";

const db = admin.firestore();

async function getDefaultSteamAPIKey(): Promise<string> {
  const doc = await db.collection("dev").doc("steamDetails").get();
  return doc.data()!.steamWebAPIKey;
}

async function getCurrentSteamGame(steamAPIKey: string, steamId: string) {
  const steamApiKey =
    steamAPIKey !== "" ? steamAPIKey : await getDefaultSteamAPIKey();
  let currentlyPlaying = "";
  let currentlyPlayingId = "";
  try {
    const steamCurrentGame = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;
    const response = await axios.get(steamCurrentGame);
    if ("gameid" in response.data.response.players[0]) {
      currentlyPlaying = response.data.response.players[0].gameextrainfo;
      currentlyPlayingId = response.data.response.players[0].gameid;
    }
    return { name: currentlyPlaying, id: currentlyPlayingId };
  } catch (error) {
    return { name: currentlyPlaying, id: currentlyPlayingId };
  }
}

interface Achievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
}

async function getSteamGameAchievementData(
  gameId: string,
  steamAPIKey: string,
  steamId: string
) {
  const steamApiKey =
    steamAPIKey !== "" ? steamAPIKey : await getDefaultSteamAPIKey();
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
