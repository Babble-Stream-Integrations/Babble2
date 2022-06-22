import axios from "axios";
import { addTokens, getTokens } from "../db/userDb";
import { getTwitchAppDetails, getTwitchAddonScopes } from "../db/devDb";
import { Addons, AuthInfo } from "../ts/types";

async function getPrevScope(user: string) {
  const tokens = (await getTokens(user, "twitch"))!;
  if ("scope" in tokens) {
    return tokens.scope;
  }
  return [];
}

async function getNextScope(addon: Addons) {
  const scope = await getTwitchAddonScopes();
  return scope[addon];
}

async function calculateScope(user: string, addon: Addons) {
  // Merge prev&next scopes
  const scopes = (await getPrevScope(user)).concat(await getNextScope(addon));

  // Remove dupes
  const cleanScopes = scopes.filter(
    (item: string, idx: number) => scopes.indexOf(item) === idx
  );

  // Space seperated list for Twitch syntax
  const result = cleanScopes.join(" ");
  return result;
}

export async function getAuthCode(user: string, addon: Addons) {
  const { clientId, redirectURL, state } = await getTwitchAppDetails();
  const scopes = await calculateScope(user, addon);

  const authUrl =
    `https://id.twitch.tv/oauth2/authorize` +
    `?response_type=code&force_verify=true&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes}&state=${state}`;

  return authUrl;
}

export async function setAccessTokens(
  user: string,
  platform: string,
  code: string
): Promise<void> {
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
  const tokens = {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    scope: res.data.scope,
  };
  await addTokens(user, platform, tokens);
}

async function refreshAccessTokens(
  refreshToken: string,
  user: string,
  platform: string
): Promise<string> {
  const { clientId, clientSecret } = await getTwitchAppDetails();
  const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    },
  });
  const tokens = {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    scope: res.data.scope,
  };
  await addTokens(user, platform, tokens);
  console.log(`${platform} tokens refreshed!`);

  return tokens.accessToken;
}

export async function authErrorHandler<Type>(
  error: unknown,
  oldAuthInfo: AuthInfo,
  func: (authInfo: AuthInfo, ...args: any[]) => Type,
  ...funcArgs: unknown[]
): Promise<Type> {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    const newAuthInfo = oldAuthInfo;
    newAuthInfo.tokens.accessToken = await refreshAccessTokens(
      oldAuthInfo.tokens.refreshToken,
      oldAuthInfo.user,
      oldAuthInfo.platform
    );

    return func(newAuthInfo, ...funcArgs);
  }
  throw error;
}
