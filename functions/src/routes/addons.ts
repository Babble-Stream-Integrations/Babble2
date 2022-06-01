import express from "express";
import admin from "firebase-admin";
// import youtubeRaffle from "../services/youtubeRaffle";
import twitchRaffle from "../services/twitchRaffle";

const db = admin.firestore();

const router = express.Router();

router.post("/raffle/start", async (req, res) => {
  const settingsDoc = await db
    .collection("users")
    .doc(req.body.user)
    .collection("addons")
    .doc(req.body.addon)
    .get();
  if (!settingsDoc.exists) {
    throw new Error("addon document not found");
  } else if (settingsDoc.data()!.type !== "raffle") {
    throw new Error("Wrong type of addon: expected raffle addon");
  } else if (settingsDoc.data()!.platform === "youtube") {
    // const tokens = await db
    //   .collection("users")
    //   .doc(req.body.user)
    //   .collection("tokens")
    //   .doc("youtube")
    //   .get();
    // if (!doc.exists) {
    //   throw new Error("youtube tokens not found");
    // } else {
    //   youtubeRaffle.startRaffle(doc.data().settings, tokens.data());
    //   res.redirect("http://localhost:3000/rafflesettings");
    // }
    res.send({ result: "Youtube raffle has been started!" });
  } else if (settingsDoc.data()!.platform === "twitch") {
    const tokensDoc = await db
      .collection("users")
      .doc(req.body.user)
      .collection("tokens")
      .doc("twitch")
      .get();
    if (!tokensDoc.exists) {
      throw new Error("twitch tokens not found");
    } else {
      const tokens = {
        accessToken: tokensDoc.data()!.access_token,
        refreshToken: tokensDoc.data()!.refresh_token,
        scope: tokensDoc.data()!.scope,
      };

      res.send(
        await twitchRaffle.startRaffle(
          settingsDoc.data()!.settings,
          tokens,
          settingsDoc.data()!.uniqueString
        )
      );
    }
  } else {
    throw new Error("no platform detected");
  }
});

export default router;
