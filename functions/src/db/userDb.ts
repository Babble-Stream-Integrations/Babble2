import { db } from "../config/firebase";

// Interface
interface User {
  displayName: string;
  email: string;
}

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

interface Tokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
  expiresIn: number;
  tokenType: string;
}

// User functions
export async function getAllUsers() {
  const col = await db.collection("users").get();
  return col.docs.map((doc) => doc.id);
}

export async function addUser(user: string, data: User) {
  await db.doc(`users/${user}`).set(data);
}

export async function getUser(user: string) {
  const doc = await db.doc(`users/${user}`).get();
  if (!doc.exists) {
    throw new Error("User document not found");
  }
  return doc.data()!;
}

export async function deleteUser(user: string) {
  await db.doc(`users/${user}`).delete();
}

// UserAddon functions
export async function getAllAddons(user: string) {
  const col = await db.doc(`users/${user}`).collection(`addons`).get();
  return col.docs.map((doc) => doc.id);
}

export async function addAddon(user: string, addon: string, data: Addon) {
  await db.doc(`users/${user}/addons/${addon}`).set(data);
}

export async function getAddon(user: string, addon: string) {
  const doc = await db.doc(`users/${user}/addons/${addon}`).get();
  if (!doc.exists) {
    throw new Error("Addon document not found");
  }
  return doc.data()!;
}

export async function deleteAddon(user: string, addon: string) {
  await db.doc(`users/${user}/addons/${addon}`).delete();
}

export async function updateAddonSettings(
  user: string,
  addon: string,
  data: RaffleSettings
) {
  await db
    .doc(`users/${user}/addons/${addon}`)
    .set({ settings: data }, { merge: true });
}

// UserTokens functions
export async function getAllTokens(user: string) {
  const col = await db.doc(`users/${user}`).collection(`tokens`).get();
  return col.docs.map((doc) => doc.id);
}

export async function addTokens(
  user: string,
  platform: string,
  tokens: Tokens
) {
  await db.doc(`users/${user}/addons/${platform}`).set(tokens);
}

export async function getTokens(user: string, platform: string) {
  const doc = await db.doc(`users/${user}/tokens/${platform}`).get();
  if (!doc.exists) {
    throw new Error("Token document not found");
  }
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    scope,
  } = doc.data()!;
  return { accessToken, refreshToken, scope };
}

export async function deleteTokens(user: string, platform: string) {
  await db.doc(`users/${user}/addons/${platform}`).delete();
}
