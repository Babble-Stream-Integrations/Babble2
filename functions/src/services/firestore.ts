import admin from "firebase-admin";

!admin.apps.length ? admin.initializeApp() : admin.app();
const db = admin.firestore();

// User functions
interface User {}

async function getUsers() {
  const col = await db.collection("users").get();
  return col.docs.map((doc) => doc.id);
}

async function addUser(user: string, data: any) {
  const doc = await db.collection("users").doc(user).set(data, { merge: true });
  return { result: `user ${user} added to database!` };
}

async function getUser(user: string) {
  const doc = await db.collection("users").doc(user).get();
  return doc.data();
}

async function deleteUser(user: string) {
  const doc = await db.collection("users").doc(user).delete();
  return { results: `user ${user} deleted from database!` };
}

// UserAddons functions
interface addon {
  platform: string;
  type: string;
  uniqueString: string;
  settings: raffleSettings;
  looks?: unknown;
  designSettings?: unknown;
}
interface raffleSettings {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  useMyAccount: boolean;
  winnerAmount: number;
  platformOptions: twitchOptions | youtubeOptions;
}

interface twitchOptions {
  followOnly: boolean;
  followPrivilege: number;
  subOnly: boolean;
  subPrivilege: number;
}

interface youtubeOptions {
  subOnly: boolean;
  subPrivilege: number;
  memberOnly: boolean;
  memberPrivilege: number;
}

async function getAddons(user: string) {
  const col = await db.collection("users").doc(user).collection("addons").get();
  return col.docs.map((doc) => doc.id);
}

async function addAddon(user: string, addon: string, data: addon) {
  const doc = await db
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
  const doc = await db
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
  data: raffleSettings
) {
  const doc = await db
    .collection("users")
    .doc(user)
    .collection("addons")
    .doc(addon)
    .set(
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
interface tokens {
  access_token: string;
  refresh_token: string;
  scope: string[];
  expires_in?: number;
  token_type?: string;
}

interface code {
  code: string;
}

async function getTokens(user: string) {
  const col = await db.collection("users").doc(user).collection("tokens").get();
  return col.docs.map((doc) => doc.id);
}

async function addToken(user: string, platform: string, data: tokens | code) {
  const doc = await db
    .collection("users")
    .doc(user)
    .collection("tokens")
    .doc(platform)
    .set(data, { merge: true });
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
  const doc = await db
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
