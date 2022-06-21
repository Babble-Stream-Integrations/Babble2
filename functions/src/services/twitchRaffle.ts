import axios from "axios";
import tmi from "tmi.js";
import { getTwitchAppDetails, getTwitchBot } from "../db/devDb";
import { TwitchRaffleSettings, TwitchTokens } from "../ts/types";
// import { refreshAccessToken } from "./twitchAuth";

let clientId: string;

async function getStreamerChannel(
  accessToken: string
  // refreshToken: string
): Promise<string[]> {
  const res = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId,
    },
  });
  console.log("monkey");

  const streamerChannel: string = `#${res.data.data[0].login}`;
  const streamerID: string = res.data.data[0].id;
  const streamerName: string = res.data.data[0].login;
  const streamerPassword: string = `oauth:${accessToken}`;
  return [streamerChannel, streamerID, streamerName, streamerPassword];
  // try {
  //   const [newAccessToken, newrefreshToken] = await refreshAccessToken(
  //     refreshToken
  //   );
  //   return await getStreamerChannel(newAccessToken, newrefreshToken);
  // } catch (refreshErr) {
  //   if (axios.isAxiosError(err)) {
  //     throw err;
  //   }
  // }
  // throw new Error("Couldn't get Twitch user");
}

async function getStatus(
  isSubscribed: boolean,
  viewerID: string,
  streamerID: string,
  accessToken: string
): Promise<string> {
  if (isSubscribed === true) {
    return "Subscriber";
  }

  const res = await axios.get(
    `https://api.twitch.tv/helix/users/follows?from_id=${viewerID}&to_id=${streamerID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );
  if (res.data.total === 1) {
    return "Follower";
  }

  return "Pleb";
}

function calculateNewUsers(
  settings: TwitchRaffleSettings,
  status: string,
  displayName: string
): string[] {
  if (status === "Subscriber") {
    return Array(settings.subPrivilege).fill(displayName);
  }
  if (status === "Follower" && !settings.subOnly) {
    return Array(settings.followPrivilege).fill(displayName);
  }
  if (!settings.subOnly && !settings.followOnly) {
    return [displayName];
  }
  return [];
}

function pickWinner(
  usersEntered: string[],
  winnerAmount: number,
  duplicateWinners: boolean
) {
  let usersRemaining = usersEntered;
  const winnerArray = [];
  for (let i = 0; i < winnerAmount; i += 1) {
    if (usersRemaining.length === 0) {
      return winnerArray;
    }
    const randomIndex = Math.floor(Math.random() * usersRemaining.length);
    const randomUser = usersRemaining[randomIndex];
    winnerArray.push(randomUser);
    if (duplicateWinners) {
      usersRemaining.splice(randomIndex, 1);
    } else {
      usersRemaining = usersRemaining.filter((user) => user !== randomUser);
    }
  }
  return winnerArray;
}

async function start(settings: TwitchRaffleSettings, tokens: TwitchTokens) {
  console.log(settings, tokens);
  console.log("Start Twitch Raffle");
  clientId = (await getTwitchAppDetails()).clientId;

  const [streamerChannel, streamerID, streamerName, streamerPassword] =
    await getStreamerChannel(tokens.accessToken);
  const { name: botName, token: botPassword } = await getTwitchBot();

  console.log("monk");

  const client = new tmi.Client({
    options: {
      debug: true,
    },
    identity: {
      username: settings.useMyAccount ? streamerName : botName,
      password: settings.useMyAccount ? streamerPassword : botPassword,
    },
    channels: [streamerName],
  });

  client.connect().then(() => {
    client.say(
      streamerChannel,
      `Raffle started! Type ${settings.enterMessage} to enter`
    );
  });

  const usersEntered: string[] = [];

  client.on("message", async (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return;

    if (
      message.toLowerCase() === settings.enterMessage &&
      !usersEntered.includes(tags["display-name"]!)
    ) {
      const status = await getStatus(
        tags.subscriber!,
        tags["user-id"]!,
        streamerID,
        tokens.accessToken
      );
      const newUsersEntered = calculateNewUsers(
        settings,
        status,
        tags["display-name"]!
      );

      usersEntered.push(...newUsersEntered);

      console.log(status, usersEntered);
    }
  });

  setTimeout(() => {
    console.log("Users:", usersEntered);
    const winners = pickWinner(
      usersEntered,
      settings.winnerAmount,
      settings.duplicateWinners
    );
    console.log("Winners:", winners);

    if (settings.announceWinners) {
      client.say(
        streamerChannel,
        `The winners of the raffle are: ${winners.join(", ")}`
      );
    }
    client.disconnect();
  }, settings.duration * 1000);
}

export default { start };
