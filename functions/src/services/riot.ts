import axios from "axios";

const riotToken = "RGAPI-411d5d89-931c-4ff1-bcf4-ad2ccbca9d71";

interface summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIcondId: number;
  revisionDate: number;
  summonerLevel: number;
}

async function summonerByName(name: string): Promise<summoner> {
  return axios.get(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    {
      headers: {
        "X-Riot-Token": riotToken,
      },
    }
  );
}

async function summonerByID(id: string): Promise<summoner> {
  return axios.get(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${id}`,
    {
      headers: {
        "X-Riot-Token": riotToken,
      },
    }
  );
}

async function summonerByPUUID(PUUID: string): Promise<summoner> {
  return axios.get(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${PUUID}`,
    {
      headers: {
        "X-Riot-Token": riotToken,
      },
    }
  );
}

export { riotToken };
export default { summonerByName, summonerByID, summonerByPUUID };
