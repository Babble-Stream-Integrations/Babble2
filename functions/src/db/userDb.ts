import { db } from "../config/firebase";
import { Addon, AddonSettings, Tokens, User } from "../ts/types";

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
  return doc.data() as User;
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
  return doc.data() as Addon;
}

export async function deleteAddon(user: string, addon: string) {
  await db.doc(`users/${user}/addons/${addon}`).delete();
}

export async function updateAddonSettings(
  user: string,
  addon: string,
  data: AddonSettings
) {
  await db
    .doc(`users/${user}/addons/${addon}`)
    .set({ settings: data }, { merge: true });
}

// UserTokens functions (routes largely removed until babble auth implementation)
export async function getAllTokens(user: string) {
  const col = await db.doc(`users/${user}`).collection(`tokens`).get();
  return col.docs.map((doc) => doc.id);
}

export async function addTokens(
  user: string,
  platform: string,
  tokens: Tokens
) {
  console.log("New tokens received");
  await db.doc(`users/${user}/tokens/${platform}`).set(tokens);
}

export async function getTokens(user: string, platform: string) {
  const doc = await db.doc(`users/${user}/tokens/${platform}`).get();
  return doc.data() as Tokens;
}

export async function deleteTokens(user: string, platform: string) {
  await db.doc(`users/${user}/tokens/${platform}`).delete();
}
