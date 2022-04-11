import express, { Request, Response } from "express";
// import youtubeAuth from "../services/youtubeAuth";
import twitchAuth from "../services/twitchAuth";
import { Query } from "express-serve-static-core";

export interface RequestQuery<T extends Query> extends Express.Request {
  query: T;
}

const router = express.Router();

// Youtube routes
// router.get("/youtube/auth", (req, res) => {
//   youtubeAuth.getCode(res);
// });

// router.get("/youtube/callback", (req, res) => {
//   const { code } = req.query;
//   youtubeAuth.getTokensWithCode(code);
//   res.redirect("http://localhost:3000/prototype");
// });

// Twitch routes
router.get(
  "/twitch/auth",
  async (req: RequestQuery<{ user: string; addon: string }>, res) => {
    const authUrl = await twitchAuth.getCode(req.query.user, req.query.addon);
    res.send(authUrl);
  }
);

router.get(
  "/twitch/callback",
  (req: RequestQuery<{ code: string; scope: string; state: string }>, res) => {
    const code = req.query.code;
    twitchAuth.getTokensWithCode(code);
    res.redirect("https://dev-babble.web.app/prototype");
  }
);

export default router;
