import { google } from "googleapis";
import { addTokens, getTokens } from "../db/userDb";
import { getYoutubeAppDetails, getYoutubeAddonScopes } from "../db/devDb";
import { Addons, AuthInfo } from "../ts/types";

async function makeOauthClient() {
  const { clientId, clientSecret, redirectURL } = await getYoutubeAppDetails();
  const Oauth2 = google.auth.OAuth2;
  const oauth2Client = new Oauth2(clientId, clientSecret, redirectURL);
  return oauth2Client;
}

async function getPrevScope(user: string) {
  const tokens = (await getTokens(user, "youtube"))!;
  if (tokens && "scope" in tokens) {
    return tokens.scope;
  }
  return [];
}

async function getNextScope(addon: Addons) {
  const scope = await getYoutubeAddonScopes();
  return scope[addon];
}

async function calculateScope(user: string, addon: Addons) {
  // Merge prev&next scopes
  const scopes = (await getPrevScope(user)).concat(await getNextScope(addon));

  // Remove dupes
  const result = scopes.filter(
    (item: string, idx: number) => scopes.indexOf(item) === idx
  );

  return result;
}

export async function getAuthCode(user: string, addon: Addons) {
  const oauth2Client = await makeOauthClient();
  const scopes = await calculateScope(user, addon);
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return authUrl;
}

export async function setAccessTokens(
  user: string,
  platform: string,
  code: string
): Promise<void> {
  const oauth2Client = await makeOauthClient();
  const { tokens } = await oauth2Client.getToken(code);
  await addTokens(user, platform, {
    accessToken: tokens.access_token!,
    refreshToken: tokens.refresh_token!,
    scope: tokens.scope?.split(" ")!,
  });
}

export async function makeYoutubeClient(authInfo: AuthInfo) {
  const oauth2Client = await makeOauthClient();
  oauth2Client.setCredentials({
    access_token: authInfo.tokens.accessToken,
    refresh_token: authInfo.tokens.refreshToken,
  });

  // Refresh invalid tokens
  oauth2Client.on("tokens", async (tokens) => {
    console.log("tokenEvent:", tokens);
    await addTokens(authInfo.user, authInfo.platform, {
      accessToken: tokens.access_token!,
      refreshToken: authInfo.tokens.refreshToken,
      scope: tokens.scope?.split(" ")!,
    });
  });

  const youtubeClient = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });
  return youtubeClient;
}

// export async function makeBotClient()
