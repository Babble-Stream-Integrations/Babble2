import express from "express";
import admin from "firebase-admin";
// import youtubeRaffle from "../services/youtubeRaffle";
import twitchRaffle from "../services/twitchRaffle";
// import youtubeAutotitle from "../services/youtubeAutotitle";
import twitchAutoTitle from "../services/twitchAutoTitle";
import leagueToolkit from "../services/leagueToolkit";
import riot from "../services/riot";

const db = admin.firestore();

const router = express.Router();

// eslint-disable-next-line consistent-return
async function runAddon(user: string, addon: string, addonType: string) {
  const addonDoc = await db.doc(`users/${user}/addons/${addon}`).get();
  if (!addonDoc.exists) {
    throw new Error("addon document not found");
  }
  if (addonDoc.data()!.type !== addonType) {
    throw new Error(`Wrong type of addon: expected ${addonType} addon`);
  }
  const { platform } = addonDoc.data()!;
  if (platform !== "twitch" && platform !== "youtube") {
    throw new Error("no platform detected");
  }

  const tokensDoc = await db.doc(`users/${user}/tokens/twitch`).get();
  if (!tokensDoc.exists) {
    throw new Error("twitch tokens not found");
  }

  const { settings, uniqueString } = addonDoc.data()!;
  const tokens = {
    accessToken: tokensDoc.data()!.access_token,
    refreshToken: tokensDoc.data()!.refresh_token,
    scope: tokensDoc.data()!.scope,
  };
  if (platform === "youtube") {
    return { result: "Youtube addons aren't developed yet!" };
  }
  if (platform === "twitch") {
    switch (addonType) {
      case "raffleSystem":
        await twitchRaffle.startRaffle(settings, tokens, uniqueString);
        return { result: "Twitch raffle has been succesfully finished!" };
      case "automaticStreamTitle":
        await twitchAutoTitle.changeChannelInfo(settings, tokens);
        return { result: "Twitch autoTitle has been succesfully finished!" };
      case "leagueToolkit":
        await leagueToolkit.startLeagueToolkit(settings, tokens, uniqueString);
        break;
      default:
    }
  }
}

router.post("/raffle/start", async (req, res, next) => {
  try {
    res.send(await runAddon(req.body.user, req.body.addon, "raffleSystem"));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      next(error);
    }
  }
});

router.post("/autoTitle/start", async (req, res, next) => {
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
});

router.get("/summoner/:name", async (req, res) => {
  const summoner = await riot.summonerByName(req.params.name);
  res.send(summoner);
});

export default router;
