import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import admin from "firebase-admin";

import userRoutes from "./routes/users";
// const addonRoutes = require('./routes/addons');
import authRoutes from "./routes/auth";
// const layoutRoutes = require('./routes/layout');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

// twitchService.checkChat();
app.use("/api/v1", userRoutes);
// app.use('/api/v1', addonRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (_req: Request, res: Response) =>
  res.send({ result: "hi there handsome ;)" })
);

export default functions.region("europe-west1").https.onRequest(app);
