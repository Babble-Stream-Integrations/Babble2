import { Request, Response } from "express";
import { getAddon, getTokens } from "../db/userDb";
// import youtubeRaffle from "../services/youtubeRaffle";
import twitchRaffle from "../services/twitchRaffle";
// import youtubeAutotitle from "../services/youtubeAutotitle";
import twitchAutoTitle from "../services/twitchAutoTitle";
import {
  Addons,
  AuthInfo,
  AutoTitleSettings,
  TwitchRaffleSettings,
} from "../ts/types";
import { getTwitchAppDetails } from "../db/devDb";

async function runAddon(user: string, addon: string, addonType: Addons) {
  const { type, platform, settings, uniqueString } = await getAddon(
    user,
    addon
  );
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

  if (platform === "youtube") {
    return;
  }
  if (platform === "twitch") {
    if (addonType === "raffleSystem") {
      await twitchRaffle.start(
        settings as TwitchRaffleSettings,
        authInfo,
        uniqueString
      );
    }
    if (addonType === "automaticStreamTitle") {
      await twitchAutoTitle.start(settings as AutoTitleSettings, authInfo);
    }
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
