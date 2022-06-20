import axios from "axios";

const riotToken = "RGAPI-480f09fc-adaf-4ec6-8798-bb2dee6dcd0c";

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

export { riotToken };
export default {
  summonerByName,
  summonerByID,
  summonerByPUUID,
  masteryBysummonerID,
};
