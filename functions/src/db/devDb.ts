import { db } from "../config/firebase";

export async function getSteamDetails() {
  const doc = await db.doc(`dev/steamDetails`).get();
  const { steamWebAPIKey } = doc.data()!;
  return { steamWebAPIKey };
}

export async function getTwitchAddonScopes() {
  const doc = await db.doc(`dev/twitchAddonScopes`).get();
  return doc.data()!;
}

export async function getTwitchAppDetails() {
  const doc = await db.doc(`dev/twitchAppDetails`).get();
  const { clientId, clientSecret, redirectURL, state } = doc.data()!;
  return { clientId, clientSecret, redirectURL, state };
}

export async function getTwitchBot() {
  const doc = await db.doc(`dev/twitchBot`).get();
  const { name, token } = doc.data()!;
  return { name, token };
}

export async function getYoutubeAddonScopes() {
  const doc = await db.doc(`dev/youtubeAddonScopes`).get();
  return doc.data()!;
}

export async function getYoutubeAppDetails() {
  const doc = await db.doc(`dev/youtubeAppDetails`).get();
  return doc.data()!;
}

export async function getYoutubeBot() {
  const doc = await db.doc(`dev/youtubeBot`).get();
  return doc.data()!;
}
