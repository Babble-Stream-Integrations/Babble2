/* eslint-disable import/first */
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
import userRoutes from "./routes/users";
import addonRoutes from "./routes/addons";
import authRoutes from "./routes/auth";

const db = admin.firestore();

// const layoutRoutes = require('./routes/layout');

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

// twitchService.checkChat();
app.use("/api/v1", userRoutes);
app.use("/api/v1", addonRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

app.get("/copy/:from/:to", async (req: Request, res: Response) => {
  const fromArr = req.params.from.split("-");
  const toArr = req.params.to.split("-");
  let fromPath: admin.firestore.DocumentData = db;
  let toPath: admin.firestore.DocumentData = db;

  for (let x = 0; x < fromArr.length; x += 1) {
    if (x % 2 === 0) {
      fromPath = fromPath.collection(fromArr[x]);
    } else {
      fromPath = fromPath.doc(fromArr[x]);
    }
  }
  const fromDoc = await fromPath!.get();
  if (!fromDoc.exists) {
    throw new Error("No such document!");
  }

  for (let y = 0; y < toArr.length; y += 1) {
    if (y % 2 === 0) {
      toPath = toPath.collection(toArr[y]);
    } else {
      toPath = toPath.doc(toArr[y]);
    }
  }
  await toPath!.set(fromDoc.data(), { merge: true });
  res.send({
    fromData: fromDoc.data(),
    to: toArr,
  });
});

export default functions.region("europe-west1").https.onRequest(app);
