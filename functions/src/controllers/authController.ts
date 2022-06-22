import { Request, Response } from "express";
import * as twitchAuth from "../services/twitchAuth"; // g45u4u6t

export const getCode = async (req: Request, res: Response) => {
  const { user, platform, addonType } = req.params;
  if (addonType !== "raffleSystem" && addonType !== "automaticStreamTitle") {
    throw new Error("No valid addonType");
  }
  if (platform === "twitch") {
    return res.send({ url: await twitchAuth.getAuthCode(user, addonType) });
  }
  if (platform === "youtube") {
    return res.send({ url: "Yet to be implemented" });
  }
  throw new Error("No valid platform");
};

export const setTokens = async (req: Request, res: Response) => {
  const { user, platform, code } = req.params;
  await twitchAuth.setAccessTokens(user, platform, code);
  return res.send({ result: `${platform} tokens added to ${user}` });
};
