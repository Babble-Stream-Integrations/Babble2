import { Request, Response } from "express";
import * as twitchAuth from "../services/twitchAuth";

export default async (req: Request, res: Response) => {
  const { platform, uuid, addonType } = req.params;
  if (addonType !== "raffleSystem" && addonType !== "automaticStreamTitle") {
    throw new Error("No valid addonType");
  }
  if (platform === "twitch") {
    return res.send({ url: await twitchAuth.getCode(uuid, addonType) });
  }
  if (platform === "youtube") {
    return res.send({ url: "Yet to be implemented" });
  }
  throw new Error("No valid platform");
};
