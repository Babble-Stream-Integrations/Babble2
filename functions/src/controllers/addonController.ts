import { Request, Response, NextFunction } from "express";
import { getAddon, getTokens } from "../db/userDb";
// import youtubeRaffle from "../services/youtubeRaffle";
import twitchRaffle from "../services/twitchRaffle";
// import youtubeAutotitle from "../services/youtubeAutotitle";
import twitchAutoTitle from "../services/twitchAutoTitle";

// eslint-disable-next-line consistent-return
async function runAddon(user: string, addon: string, addonType: string) {
  const { type, platform, settings } = await getAddon(user, addon);
  if (type !== addonType) {
    throw new Error(`Wrong type of addon: expected ${addonType} addon`);
  }
  if (platform !== "twitch" && platform !== "youtube") {
    throw new Error("no platform detected");
  }
  const tokens = await getTokens(user, platform);

  if (platform === "youtube") {
    return { result: "Youtube addons aren't developed yet!" };
  }
  if (platform === "twitch") {
    if (addonType === "raffleSystem") {
      await twitchRaffle.startRaffle(settings, tokens);
      return { result: "Twitch raffle has been succesfully finished!" };
    }
    if (addonType === "automaticStreamTitle") {
      await twitchAutoTitle.changeChannelInfo(settings, tokens);
      return { result: "Twitch autoTitle has been succesfully finished!" };
    }
  }
}

export const runRaffle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await runAddon(req.body.user, req.body.addon, "raffleSystem"));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      next(error);
    }
  }
};

export const runAutoTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(
      await runAddon(req.body.user, req.body.addon, "automaticStreamTitle")
    );
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      next(error);
    }
  }
};
