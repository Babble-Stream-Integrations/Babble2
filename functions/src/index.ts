import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import admin from "firebase-admin";

import userRoutes from "./routes/users";
import addonRoutes from "./routes/addons";
import authRoutes from "./routes/auth";
import hostRoutes from "./routes/addonHost"
// const layoutRoutes = require('./routes/layout');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

// twitchService.checkChat();
app.use("/api/v1", userRoutes);
app.use("/api/v1", addonRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", hostRoutes);

app.get("/", (_req: Request, res: Response) =>
  res.send({ result: "hi there handsome ;)" })
);

export default functions.region("europe-west1").https.onRequest(app);
