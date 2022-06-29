import { Request, Response } from "express";
import { getAddon, getTokens } from "../db/userDb";
import yr from "../services/youtubeRaffle";
import tr from "../services/twitchRaffle";
import ya from "../services/youtubeAutoTitle";
import ta from "../services/twitchAutoTitle";
import {
  Addons,
  AuthInfo,
  AutoTitleSettings,
  TwitchRaffleSettings,
  YoutubeRaffleSettings,
} from "../ts/types";
import { getTwitchAppDetails } from "../db/devDb";

async function runAddon(user: string, addon: string, addonType: Addons) {
  const { type, platform, settings } = await getAddon(user, addon);
  if (type !== addonType) {
    throw new Error(`Wrong type of addon: expected ${addonType} addon`);
  }
  if (platform !== "twitch" && platform !== "youtube") {
    throw new Error("No platform detected");
  }
  const authInfo: AuthInfo = {
    user,
    platform,
    tokens: await getTokens(user, platform),
    clientId: (await getTwitchAppDetails()).clientId,
  };

  switch (platform) {
    case "twitch":
      switch (addonType) {
        case "raffleSystem":
          await tr.start(settings as TwitchRaffleSettings, authInfo);
          break;
        case "automaticStreamTitle":
          await ta.start(settings as AutoTitleSettings, authInfo);
          break;
        default:
      }
      return `Twitch ${addonType} has been succesfully finished!`;

    case "youtube":
      switch (addonType) {
        case "raffleSystem":
          await yr.start(settings as YoutubeRaffleSettings, authInfo);
          break;
        case "automaticStreamTitle":
          await ya.start(settings as AutoTitleSettings, authInfo);
          break;
        default:
      }
      return `Youtube ${addonType} has been succesfully finished!`;

    default:
      throw new Error("No platform detected");
  }
}

export const runRaffle = async (req: Request, res: Response) => {
  await runAddon(req.body.user, req.body.addon, "raffleSystem");
  res.send({ result: "Twitch raffle has been succesfully finished!" });
};

export const runAutoTitle = async (req: Request, res: Response) => {
  await runAddon(req.body.user, req.body.addon, "automaticStreamTitle");
  res.send({ result: "Twitch autoTitle has been succesfully finished!" });
};
