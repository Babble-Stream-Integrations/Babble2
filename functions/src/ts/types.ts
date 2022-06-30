// Main
export type Addons = "raffleSystem" | "automaticStreamTitle";
export type Platforms = "twitch" | "youtube";

// devDb
export type SteamDetails = {
  steamWebAPIKey: string;
};
export type TwitchAddonScopes = {
  automaticStreamTitle: string[];
  raffleSystem: string[];
};
export type TwitchAppDetails = {
  clientId: string;
  clientSecret: string;
  redirectURL:
    | "http://localhost:3000/prototype"
    | "https://dev-babble.web.app/prototype";
  state: string;
};
export type TwitchBot = {
  name: string;
  token: string;
};
export type YoutubeAddonScopes = {
  automaticStreamTitle: string[];
  raffleSystem: string[];
};
export type YoutubeAppDetails = {
  clientId: string;
  clientSecret: string;
  redirectURL: string;
};
export type YoutubeBot = {};

// userDb
/// User
export type User = {
  displayName: string;
  email: string;
};

/// Addon
type RaffleSettings = {
  announceWinners: boolean;
  duplicateWinners: boolean;
  duration: number;
  enterMessage: string;
  useMyAccount: boolean;
  winnerAmount: number;
};
export type TwitchRaffleSettings = RaffleSettings & {
  followOnly: boolean;
  followPrivilege: number;
  subOnly: boolean;
  subPrivilege: number;
};
export type YoutubeRaffleSettings = RaffleSettings & {
  subOnly: boolean;
  subPrivilege: number;
  memberOnly: boolean;
  memberPrivilege: number;
};

export type AutoTitleSettings = {
  changeGame: boolean;
  customTitle?: string;
  justChatting?: boolean;
  steamAPIKey?: string;
  steamId: string;
};

export type AddonSettings =
  | TwitchRaffleSettings
  | YoutubeRaffleSettings
  | AutoTitleSettings;

export type AddonStyling = {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  borderSize: string;
  iconColor: string;
  position: number;
  primaryTextColor: string;
  primaryTextFont: string;
  scale: number;
  secondaryTextColor: string;
  secondaryTextFont: string;
};

export type Addon = {
  platform: Platforms;
  settings: AddonSettings;
  styling: AddonStyling;
  type: Addons;
  uniqueString: string;
};

/// Auth
export type TwitchTokens = {
  accessToken: string;
  refreshToken: string;
  scope: string[];
};

export type Tokens = TwitchTokens;

export type AuthInfo = {
  user: string;
  platform: string;
  tokens: Tokens;
  clientId: string;
};

//  SteamKit
export type Achievement = {
  apiname: string;
  achieved: number;
  unlocktime: number;
};
export type TitleVariables = {
  gameName: string;
  achievementsTotal: string;
  achievementsAchieved: string;
  achievementsLeft: string;
};
export type Game = {
  name: string;
  id: string;
};
