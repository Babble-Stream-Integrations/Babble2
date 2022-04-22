import express, { Request } from "express";
// import youtubeAuth from "../services/youtubeAuth";
import { getCode } from "../services/twitchAuth";

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
interface userInfo {
  uuid: string;
  addonName: string;
}

router.get(
  "/twitch/auth",
  async (req: Request<unknown, unknown, unknown, userInfo>, res) => {
    const authUrl = await getCode(req.query.uuid, req.query.addonName);
    res.send(authUrl);
  }
);

export default router;
