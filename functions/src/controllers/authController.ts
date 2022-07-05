import { Request, Response } from "express";
import * as twitchAuth from "../services/twitchAuth";
import * as youtubeAuth from "../services/youtubeAuth";

export const getURL = async (req: Request, res: Response) => {
  const { user, platform, addonType } = req.params;
  if (addonType !== "raffleSystem" && addonType !== "automaticStreamTitle") {
    throw new Error("No valid addonType");
  }
  if (platform === "twitch") {
    return res.send({ url: await twitchAuth.getAuthCode(user, addonType) });
  }
  if (platform === "youtube") {
    return res.send({ url: await youtubeAuth.getAuthCode(user, addonType) });
  }
  throw new Error("No valid platform");
};

export const setTokens = async (req: Request, res: Response) => {
  const { user, platform } = req.params;

  if (platform === "twitch") {
    await twitchAuth.setAccessTokens(user, platform, req.body.code);
    return res.send({ result: `${platform} tokens added to ${user}!` });
  }
  if (platform === "youtube") {
    await youtubeAuth.setAccessTokens(user, platform, req.body.code);
    return res.send({ result: `${platform} tokens added to ${user}!` });
  }
  throw new Error("No valid platform");
};
