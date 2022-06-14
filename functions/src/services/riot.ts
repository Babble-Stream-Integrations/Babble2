import axios from "axios";

async function summonerID(name:string) {
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`, {headers:{"X-Riot-Token": "RGAPI-8b2c43e7-5a2e-4df9-9557-b5539104f0c7"}}).then((res) => {
        console.log(res);
    })
}




//header "X-Riot-Token": "RGAPI-8b2c43e7-5a2e-4df9-9557-b5539104f0c7"
