import admin from "firebase-admin";

!admin.apps.length ? admin.initializeApp() : admin.app();
const db = admin.firestore();

// User functions
async function getUsers() {
  const col = await db.collection("users").get();
  return col.docs.map((doc) => doc.id);
}

async function addUser(user: string, data: any) {
  console.log({ user: user, data: data });
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
async function getAddons(user: string) {
  const col = await db.collection("users").doc(user).collection("addons").get();
  return col.docs.map((doc) => doc.id);
}

async function addAddon(user: string, addon: string, data: any) {
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

async function updateSettings(user: string, addon: string, data: any) {
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
async function getTokens(user: string) {
  const col = await db.collection("users").doc(user).collection("tokens").get();
  return col.docs.map((doc) => doc.id);
}

async function addToken(user: string, platform: string, data: any) {
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
