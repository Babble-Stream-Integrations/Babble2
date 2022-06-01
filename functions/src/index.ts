/* eslint-disable import/first */
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
import userRoutes from "./routes/users";
import addonRoutes from "./routes/addons";
import authRoutes from "./routes/auth";
import hostRoutes from "./routes/addonHost";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  const origin =
    req.headers.origin === "http://localhost:3000"
      ? "http://localhost:3000"
      : "https://dev-babble.web.app";

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use(async (req, res, next) => {
  const appCheckToken = req.header("appchecktoken");
  if (appCheckToken !== undefined) {
    if (process.env.NODE_ENV === "production") {
      try {
        await admin.appCheck().verifyToken(appCheckToken);
        functions.logger.log("appcheck: valid");
        next();
      } catch (err) {
        functions.logger.log("appcheck: invalid");
        //strict mode:
        // res.status(400).send({ error: "Invalid appcheck token" });
        // throw new Error("Invalid appcheck token");
        next();
      }
    } else {
      next();
    }
  } else {
    functions.logger.log("appcheck: missing");
    //strict mode:
    // res.status(400).send({ error: "Missing appcheck token" });
    // throw new Error("missing appcheck token");
    next();
  }
});

// twitchService.checkChat();
app.use("/api/v1", userRoutes);
app.use("/api/v1", addonRoutes);
app.use("/api/v1", authRoutes);
app.use("/overlay", hostRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

export default functions.region("europe-west1").https.onRequest(app);
