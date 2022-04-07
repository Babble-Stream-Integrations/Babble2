import axios, { Axios, AxiosResponse } from "axios";
import tmi from "tmi.js";
import { refreshAccessToken } from "./twitchAuth";
import admin from "firebase-admin";

!admin.apps.length ? admin.initializeApp() : admin.app();
const db = admin.firestore();

interface TwitchRaffleSettings {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  followOnly: boolean;
  followPrivilege: number;
  subOnly: boolean;
  subPrivilege: number;
  useMyAccount: boolean;
  winnerAmount: number;
}

interface TwitchTokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
}

async function getClientId(): Promise<string> {
  const doc = await db.collection("dev").doc("twitchAppDetails").get();
  return doc.data()!.clientId;
}

async function getStreamerChannel(
  accessToken: string,
  refreshToken: string
): Promise<string[]> {
  try {
    const res = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Client-Id": await getClientId(),
      },
    });

    const streamerChannel: string = "#" + res.data.data[0].login;
    const streamerID: string = res.data.data[0].id;
    const streamerName: string = res.data.data[0].login;
    const streamerPassword: string = "oauth:" + accessToken;
    return [streamerChannel, streamerID, streamerName, streamerPassword];
  } catch (err) {
    try {
      const [newAccessToken, newrefreshToken] = await refreshAccessToken(
        refreshToken
      );
      return await getStreamerChannel(newAccessToken, newrefreshToken);
    } catch (err) {
      console.error(err);
    }
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw new Error("Couldn't get Twitch user");
  }
}

async function getBotDetails() {
  const doc = await db.collection("dev").doc("twitchBot").get();
  return [doc.data()!.name, doc.data()!.token];
}

async function startRaffle(
  settings: TwitchRaffleSettings,
  tokens: TwitchTokens
) {
  console.log(settings, tokens);
  console.log("Start Twitch Raffle");

  try {
    const [streamerChannel, streamerID, streamerName, streamerPassword] =
      await getStreamerChannel(tokens.accessToken, tokens.refreshToken);
    const [botName, botPassword] = await getBotDetails();

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
        "Raffle started! Type " + settings.enterMessage + " to enter"
      );
    });

    let usersEntered: string[] = [];

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

    setTimeout(function () {
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
          "The winners of the raffle are: " + winners.join(", ")
        );
      }
      client.disconnect();
      return { result: "Twitch raffle has been started!" };
    }, settings.duration * 1000);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.message);
      return { error: err.response?.status };
    }
  }
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

  try {
    const res = await axios.get(
      "https://api.twitch.tv/helix/users/follows?from_id=" +
        viewerID +
        "&to_id=" +
        streamerID +
        "",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Client-Id": await getClientId(),
        },
      }
    );
    if (res.data.total === 1) {
      return "Follower";
    }
  } catch (err) {
    console.error(err);
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
  let winnerArray = [];
  for (let i = 0; i < winnerAmount; i++) {
    if (usersEntered.length !== 0) {
      const random = Math.floor(Math.random() * usersEntered.length);
      winnerArray.push(usersEntered[random]);
      if (!duplicateWinners) {
        let i = 0;
        const arrayItem = usersEntered[random];
        while (i < usersEntered.length) {
          if (usersEntered[i] === arrayItem) {
            usersEntered.splice(i, 1);
          } else {
            ++i;
          }
        }
      } else {
        usersEntered.splice(random, 1);
      }
    }
  }
  return winnerArray;
}

export default { startRaffle };
