import { youtube_v3 as ytV3 } from "googleapis";
// import { addTokens } from "../db/userDb";
import { AuthInfo, YoutubeRaffleSettings } from "../ts/types";
import { makeYoutubeClient } from "./youtubeAuth";

let settings: YoutubeRaffleSettings;
let youtubeClient: ytV3.Youtube;
let raffleTimer: number;
const usersEntered: string[] = [];

async function findActiveChat() {
  const response = await youtubeClient.liveBroadcasts.list({
    part: ["snippet"],
    broadcastStatus: "active",
  });
  const channelId = response.data.items?.[0]?.snippet?.channelId;
  const liveChatId = response.data.items?.[0]?.snippet?.liveChatId;
  if (!channelId || !liveChatId) throw new Error("No active stream found");
  return [channelId, liveChatId];
}

async function postMessage(liveChatId: string, messageText: string) {
  if (settings.announceWinners) {
    await youtubeClient.liveChatMessages.insert({
      // auth: !!useMyAccount ? userAuth : botAuth,
      part: ["snippet"],
      requestBody: {
        snippet: {
          liveChatId,
          type: "textMessageEvent",
          textMessageDetails: {
            messageText,
          },
        },
      },
    });
  }
}

function printMessage(message: ytV3.Schema$LiveChatMessage) {
  const d = new Date();
  const hour = d.getUTCHours() + 2;
  const minutes = d.getUTCMinutes();
  const user = message.authorDetails?.displayName;
  const messageText = message.snippet?.displayMessage;
  console.log(`[${hour}:${minutes}] User: ${user} | Message: ${messageText}`);
}

async function isMember() {
  try {
    const response = await youtubeClient.members.list({
      part: ["snippet"],
    });

    // isMember is yet to be implemented when channel with members is avalaible for testing
    console.log(response.data);
  } catch (err) {
    console.log("Could not check member!");
  }
  return false;
}

async function isSubscriber(channelId: string, authorId: string) {
  try {
    const response = await youtubeClient.subscriptions.list({
      part: ["snippet", "contentDetails", "subscriberSnippet"],
      channelId,
      forChannelId: authorId,
    });
    if (response.data.pageInfo?.totalResults ?? 0 >= 1) {
      return true;
    }
  } catch (err) {
    console.log("Could not check subscriber:", err);
  }
  return false;
}

async function enterRaffle(
  channelId: string,
  authorId: string,
  author: string
) {
  if (await isMember()) {
    return Array(settings.memberPrivilege).fill(author);
  }
  if ((await isSubscriber(channelId, authorId)) && !settings.memberOnly) {
    return Array(settings.subPrivilege).fill(author);
  }
  if (!settings.memberOnly && !settings.subOnly) {
    return [author];
  }
  return [];
}

async function getChatMessages(
  channelId: string,
  liveChatId: string,
  nextPageToken?: string,
  init?: boolean
) {
  const { data } = await youtubeClient.liveChatMessages.list({
    part: ["snippet", "authorDetails"],
    liveChatId,
    maxResults: 2000,
    pageToken: nextPageToken,
  });
  if (init) {
    data.items?.forEach(async (message) => {
      printMessage(message);
      const messageText = message.snippet?.displayMessage?.toLowerCase();
      const enterMessage = settings.enterMessage.toLowerCase();
      const author = message.authorDetails?.displayName!;
      const authorId = message.authorDetails?.channelId!;
      if (messageText === enterMessage && !usersEntered.includes(author)) {
        usersEntered.push(...(await enterRaffle(channelId, authorId, author)));
      }
    });
  }
  raffleTimer = setTimeout(
    getChatMessages,
    data.pollingIntervalMillis!,
    channelId,
    liveChatId,
    data.nextPageToken,
    true
  );
}

function pickWinner() {
  let usersRemaining = usersEntered;
  const winnerArray = [];
  for (let i = 0; i < settings.winnerAmount; i += 1) {
    if (usersRemaining.length === 0) {
      return winnerArray;
    }
    const randomIndex = Math.floor(Math.random() * usersRemaining.length);
    const randomUser = usersRemaining[randomIndex];
    winnerArray.push(randomUser);
    if (settings.duplicateWinners) {
      usersRemaining.splice(randomIndex, 1);
    } else {
      usersRemaining = usersRemaining.filter((user) => user !== randomUser);
    }
  }
  return winnerArray;
}

async function start(
  raffleSettings: YoutubeRaffleSettings,
  authInfo: AuthInfo
) {
  settings = raffleSettings;
  youtubeClient = await makeYoutubeClient(authInfo);
  const [channelId, liveChatId] = await findActiveChat();

  // botAuth.on("tokens", (tokens) => {
  //   addTokens(authInfo.user, authInfo.platform, tokens);
  // });

  postMessage(
    liveChatId,
    `Raffle started! Type ${settings.enterMessage} to enter`
  );

  getChatMessages(channelId, liveChatId);
  setTimeout(() => {
    clearTimeout(raffleTimer);
    const winners = pickWinner();
    console.log("Entered:", usersEntered);
    console.log("Winners:", winners);
    if (settings.announceWinners) {
      postMessage(
        liveChatId,
        `The winners of the raffle are: ${winners.join(", ")}`
      );
    }
  }, settings.duration * 1000);
}

export default { start };
