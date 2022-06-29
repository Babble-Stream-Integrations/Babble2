import { Request, Response } from "express";
import * as twitchAuth from "../services/twitchAuth";

export default async (req: Request, res: Response) => {
  const { platform, uuid, addonType } = req.params;
  let authUrl;

  if (platform === "twitch") {
    authUrl = await twitchAuth.getCode(uuid, addonType);
  } else if (platform === "youtube") {
    authUrl = "Yet to be implemented";
  } else {
    return res.status(400).send({ error: "No valid platform" });
  }

  return res.send({ url: authUrl });
};
