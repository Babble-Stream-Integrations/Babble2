import { Request, Response } from "express";
import { getAddon, getTokens } from "../db/userDb";
// import youtubeRaffle from "../services/youtubeRaffle";
import twitchRaffle from "../services/twitchRaffle";
// import youtubeAutotitle from "../services/youtubeAutotitle";
import twitchAutoTitle from "../services/twitchAutoTitle";
import { Addons, AutoTitleSettings, TwitchRaffleSettings } from "../ts/types";

// eslint-disable-next-line consistent-return
async function runAddon(user: string, addon: string, addonType: Addons) {
  const { type, platform, settings } = await getAddon(user, addon);
  if (type !== addonType) {
    throw new Error(`Wrong type of addon: expected ${addonType} addon`);
  }
  const tokens = await getTokens(user, platform);

  if (platform === "youtube") {
    return { result: "Youtube addons aren't developed yet!" };
  }
  if (platform === "twitch") {
    if (addonType === "raffleSystem") {
      await twitchRaffle.start(settings as TwitchRaffleSettings, tokens);
    }
    if (addonType === "automaticStreamTitle") {
      await twitchAutoTitle.start(settings as AutoTitleSettings, tokens);
    }
  }
  throw new Error("No platform detected");
}

export const runRaffle = async (req: Request, res: Response) => {
  await runAddon(req.body.user, req.body.addon, "raffleSystem");
  res.send({ result: "Twitch raffle has been succesfully finished!" });
};

export const runAutoTitle = async (req: Request, res: Response) => {
  await runAddon(req.body.user, req.body.addon, "automaticStreamTitle");
  res.send({ result: "Twitch autoTitle has been succesfully finished!" });
};
