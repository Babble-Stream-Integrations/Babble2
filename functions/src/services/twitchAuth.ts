import axios from "axios";
import admin from "firebase-admin";

!admin.apps.length ? admin.initializeApp() : admin.app();
const db = admin.firestore();

interface twitchAppDetails {
  clientId: string;
  clientSecret: string;
  redirectURL: string;
  state: string;
}

async function getTwitchAppDetails() {
  const doc = await db.collection("dev").doc("twitchAppDetails").get();

  const results: twitchAppDetails = {
    clientId: doc.data()!.clientId,
    clientSecret: doc.data()!.clientSecret,
    redirectURL: doc.data()!.redirectURLMain,
    state: doc.data()!.state,
  };
  return results;
}

async function getPrevScope(user: string) {
  const doc = await db
    .collection("users")
    .doc(testUser)
    .collection("tokens")
    .doc("twitch")
    .get();

  if (doc.exists && doc.data()!.scope) {
    return doc.data()!.scope;
  }
  return [];
}

async function getNextScope(addon: string) {
  const doc = await db.collection("dev").doc("twitchAddonScopes").get();
  if (!doc.exists) {
    new Error("Wrong addon specified!");
  }
  return doc.data()![addon];
}

async function calculateScope(user: string, addon: string) {
  console.log(await getPrevScope(user), await getNextScope(addon));

  // Merge prev&next scopes
  const scopes = (await getPrevScope(user)).concat(await getNextScope(addon));

  // Remove dupes
  let result = scopes.filter(
    (item: string, idx: number) => scopes.indexOf(item) === idx
  );

  // Space seperated list for Twitch syntax
  result = result.join(" ");

  return result;
}

async function getCode(user: string, addon: string) {
  const { clientId, redirectURL, state } = await getTwitchAppDetails();
  const scopes = await calculateScope(user, addon);

  const authUrl =
    `https://id.twitch.tv/oauth2/authorize` +
    `?response_type=code&force_verify=true&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes}&state=${state}`;

  return authUrl;
}

const testUser = "zDdxO4Pok8b5UeVTUny2RbD1S6A2";

async function getTokensWithCode(code: string) {
  const { clientId, clientSecret, redirectURL } = await getTwitchAppDetails();

  try {
    const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirectURL,
      },
    });
    const tokenRes = db
      .collection("users")
      .doc(testUser)
      .collection("tokens")
      .doc("twitch")
      .set(res.data);
  } catch (err) {
    console.error(err);
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string[]> {
  const { clientId, clientSecret } = await getTwitchAppDetails();

  try {
    const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      },
    });
    const tokenRes = db
      .collection("users")
      .doc(testUser)
      .collection("tokens")
      .doc("twitch")
      .set(res.data);

    return [res.data.access_token, res.data.refresh_token];
  } catch (err) {
    throw new Error("Couldn't refresh accessToken");
  }
}

export default { getCode, getTokensWithCode };
export { refreshAccessToken };
