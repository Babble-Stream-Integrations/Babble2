import db from "../config/firebase";
import {
  SteamDetails,
  TwitchAddonScopes,
  TwitchAppDetails,
  TwitchBot,
  YoutubeAddonScopes,
  YoutubeAppDetails,
  YoutubeBot,
} from "../ts/types";

export async function getSteamDetails() {
  const doc = await db.doc(`dev/steamDetails`).get();
  return doc.data() as SteamDetails;
}

export async function getTwitchAddonScopes() {
  const doc = await db.doc(`dev/twitchAddonScopes`).get();
  return doc.data() as TwitchAddonScopes;
}

export async function getTwitchAppDetails() {
  const doc = await db.doc(`dev/twitchAppDetails`).get();
  return doc.data() as TwitchAppDetails;
}

export async function getTwitchBot() {
  const doc = await db.doc(`dev/twitchBot`).get();
  return doc.data() as TwitchBot;
}

export async function getYoutubeAddonScopes() {
  const doc = await db.doc(`dev/youtubeAddonScopes`).get();
  return doc.data() as YoutubeAddonScopes;
}

export async function getYoutubeAppDetails() {
  const doc = await db.doc(`dev/youtubeAppDetails`).get();
  return doc.data() as YoutubeAppDetails;
}

export async function getYoutubeBot() {
  const doc = await db.doc(`dev/youtubeBot`).get();
  return doc.data() as YoutubeBot;
}
