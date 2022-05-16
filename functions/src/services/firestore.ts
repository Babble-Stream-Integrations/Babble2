import axios from "axios";
import admin from "firebase-admin";
import { getTokensWithCode } from "./twitchAuth";

const db = admin.firestore();
// User functions
interface User {
  displayName: string;
  email: string;
}

async function getUsers() {
  const col = await db.collection("users").get();
  return col.docs.map((doc) => doc.id);
}

async function addUser(user: string, data: User) {
  await db.collection("users").doc(user).set(data, { merge: true });
  return { result: `user ${user} added to database!` };
}

async function getUser(user: string) {
  const doc = await db.collection("users").doc(user).get();
  return doc.data();
}

async function deleteUser(user: string) {
  await db.collection("users").doc(user).delete();
  return { results: `user ${user} deleted from database!` };
}

// UserAddons functions
interface TwitchOptions {
  followOnly: boolean;
  followPrivilege: number;
  subOnly: boolean;
  subPrivilege: number;
}
interface YoutubeOptions {
  subOnly: boolean;
  subPrivilege: number;
  memberOnly: boolean;
  memberPrivilege: number;
}
interface RaffleSettings {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  useMyAccount: boolean;
  winnerAmount: number;
  platformOptions: TwitchOptions | YoutubeOptions;
}
interface Addon {
  platform: string;
  type: string;
  uniqueString: string;
  settings: RaffleSettings;
  looks?: unknown;
  designSettings?: unknown;
}

async function getAddons(user: string) {
  const col = await db.collection("users").doc(user).collection("addons").get();
  return col.docs.map((doc) => doc.id);
}

async function addAddon(user: string, addon: string, data: Addon) {
  await db
    .collection("users")
    .doc(user)
    .collection("addons")
    .doc(addon)
    .set(data, { merge: true });

  return { result: `addon ${addon} added to ${user}` };
}

async function getAddon(user: string, addon: string) {
  const doc = await db
    .collection("users")
    .doc(user)
    .collection("addons")
    .doc(addon)
    .get();
  return doc.data();
}

async function deleteAddon(user: string, addon: string) {
  await db
    .collection("users")
    .doc(user)
    .collection("addons")
    .doc(addon)
    .delete();
  return { result: `addon ${addon} deleted from ${user}` };
}

async function updateSettings(
  user: string,
  addon: string,
  data: RaffleSettings
) {
  await db.collection("users").doc(user).collection("addons").doc(addon).set(
    {
      settings: data,
    },
    { merge: true }
  );
  return { result: `addon ${addon} updated in ${user}` };
}

async function getSettings(user: string, addon: string) {
  const doc = await db
    .collection("users")
    .doc(user)
    .collection("addons")
    .doc(addon)
    .get();
  return doc.data()!.settings;
}

// UserToken functions
interface Tokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
  expiresIn?: number;
  tokenType?: string;
}

interface Code {
  code: string;
}

async function getTokens(user: string) {
  const col = await db.collection("users").doc(user).collection("tokens").get();
  return col.docs.map((doc) => doc.id);
}

async function addToken(user: string, platform: string, data: Tokens | Code) {
  let tokens: ReturnType<typeof getTokensWithCode> | Tokens;
  if ((data as Code).code) {
    try {
      tokens = await getTokensWithCode((data as Code).code);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return { error: err.response?.data };
      }
      return { error: "Couldn't generate token" };
    }
  } else {
    tokens = data as Tokens;
  }

  await db
    .collection("users")
    .doc(user)
    .collection("tokens")
    .doc(platform)
    .set(tokens, { merge: true });
  return { result: `${platform} tokens added to ${user}` };
}

async function getToken(user: string, platform: string) {
  const doc = await db
    .collection("users")
    .doc(user)
    .collection("tokens")
    .doc(platform)
    .get();
  return doc.data();
}

async function deleteToken(user: string, platform: string) {
  await db
    .collection("users")
    .doc(user)
    .collection("tokens")
    .doc(platform)
    .delete();
  return { result: `${platform} tokens deleted from ${user}` };
}

export default {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  getAddons,
  addAddon,
  getAddon,
  deleteAddon,
  getSettings,
  updateSettings,
  getTokens,
  addToken,
  getToken,
  deleteToken,
};
