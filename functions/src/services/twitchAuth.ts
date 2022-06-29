import axios from "axios";
import { getTokens } from "../db/userDb";
import { getTwitchAppDetails, getTwitchAddonScopes } from "../db/devDb";

interface Tokens {
  accessToken: string;
  refreshToken: string;
  scope: string[];
  expiresIn?: number;
  tokenType?: string;
}

async function getPrevScope(user: string) {
  const tokens = (await getTokens(user, "twitch"))!;
  if ("scope" in tokens) {
    return tokens.scope;
  }
  return [];
}

async function getNextScope(addon: string) {
  const scope = (await getTwitchAddonScopes()).get(addon);
  if (!scope) {
    throw new Error("Wrong addon specified!");
  }
  return scope;
}

async function calculateScope(user: string, addon: string) {
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

export async function getCode(user: string, addon: string) {
  const { clientId, redirectURL, state } = await getTwitchAppDetails();
  const scopes = await calculateScope(user, addon);

  const authUrl =
    `https://id.twitch.tv/oauth2/authorize` +
    `?response_type=code&force_verify=true&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes}&state=${state}`;

  return authUrl;
}

export async function getTokensWithCode(code: string): Promise<Tokens> {
  const { clientId, clientSecret, redirectURL } = await getTwitchAppDetails();

  const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectURL,
    },
  });
  return res.data as Tokens;
}

// export async function refreshAccessToken(
//   refreshToken: string
// ): Promise<string[]> {
//   const { clientId, clientSecret } = await getTwitchAppDetails();

//   try {
//     const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
//       params: {
//         refresh_token: refreshToken,
//         client_id: clientId,
//         client_secret: clientSecret,
//         grant_type: "refresh_token",
//       },
//     });
//     db.collection("users")
//       .doc("sf")
//       .collection("tokens")
//       .doc("twitch")
//       .set(res.data);

//     return [res.data.access_token, res.data.refresh_token];
//   } catch (err) {
//     throw new Error("Couldn't refresh accessToken");
//   }
// }
