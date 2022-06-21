import axios, { AxiosResponse, AxiosError } from "axios";
import { act } from "react-dom/test-utils";

const riotToken = "RGAPI-52889f89-2a59-47f1-bba5-0afe339788af";

interface summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIcondId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface masteryDto {
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  championId: number;
  lastPlayTime: number;
  championLevel: number;
  summonerId: string;
  championPoints: number;
  championPointsSinceLastLevel: number;
  tokensEarned: number;
}

interface activegame {
  gameID: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: Array<{
    pickTurn: number;
    championId: number;
    teamId: number;
  }>;
  gameQueueConfigId: number;
  // not entirely sure https://developer.riotgames.com/apis#spectator-v4/GET_getCurrentGameInfoBySummoner to check for yourself
  observers: string;
  // didn't add all details for this one yet
  participants: Array<{}>;
}

async function summonerByName(name: string): Promise<summoner> {
  return (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data;
}

async function summonerByID(id: string): Promise<summoner> {
  return (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${id}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data;
}

async function summonerByPUUID(PUUID: string): Promise<summoner> {
  return (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${PUUID}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data;
}

async function masteryBysummonerID(
  summonerID: string
): Promise<Array<masteryDto>> {
  return (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data;
}

async function totalMasteryBysummonerID(summonerID: string): Promise<number> {
  return (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerID}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data;
}

async function LOLActiveGame(summonerID: string): Promise<activegame | string> {
  const activeGame = (
    await axios.get(
      `https://euw1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerID}`,
      {
        headers: {
          "X-Riot-Token": riotToken,
        },
      }
    )
  ).data.catch((reason: AxiosError) => {
    if (reason.response!.status === 404) {
      return "user is not in active game";
    }
    return "an error has occured";
  });
  return activeGame;
}

export { riotToken };
export default {
  summonerByName,
  summonerByID,
  summonerByPUUID,
  masteryBysummonerID,
  totalMasteryBysummonerID,
  LOLActiveGame,
};
