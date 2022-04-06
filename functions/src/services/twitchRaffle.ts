import axios from "axios";
import tmi from "tmi.js";
import admin from "firebase-admin";

!admin.apps.length ? admin.initializeApp() : admin.app();
const db = admin.firestore();

interface TwitchRaffleSettings {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  memberOnly: boolean;
  memberPrivilege: number;
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

async function getUserChannel(accessToken: string): Promise<string[]> {
  const res = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Client-Id": await getClientId(),
    },
  });

  const userChannel: string = "#" + res.data.data[0].login;
  const userID: string = res.data.data[0].id;
  const userName: string = res.data.data[0].login;
  const userPassword: string = "oauth:" + accessToken;
  return [userChannel, userID, userName, userPassword];
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

  const [userChannel, userID, userName, userPassword] = await getUserChannel(
    tokens.accessToken
  );
  const [botName, botPassword] = await getBotDetails();

  const client = new tmi.Client({
    options: {
      debug: true,
    },
    identity: {
      username: settings.useMyAccount ? userName : botName,
      password: settings.useMyAccount ? userPassword : botPassword,
    },
    channels: [userName],
  });

  client.connect().then(() => {
    client.say(
      userChannel,
      "Raffle started! Type " + settings.enterMessage + " to enter"
    );
  });

  let raffleUsersEntered: string[] = [];

  client.on("message", (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return;

    if (
      message.toLowerCase() === settings.enterMessage &&
      !raffleUsersEntered.includes(tags.username!)
    ) {
      console.log(tags["display-name"]);

      // sortUser(
      //   data,
      //   raffleUsersEntered,
      //   tags["display-name"],
      //   tags["user-id"],
      //   userID,
      //   tags.subscriber
      // );
    }
  });

  setTimeout(function () {
    // const winners = pickWinner(
    //   raffleUsersEntered,
    //   parseInt(data.winnerAmount),
    //   data.duplicateWinners
    // );
    // if (data.announceWinners) {
    //   client.say(
    //     userChannel,
    //     "The winners of the raffle are: " + winners.join(", ")
    //   );
    // }
    client.disconnect();
    console.log("Raffle ended!");
  }, settings.duration * 60 * 1000);
}

export default { startRaffle };
