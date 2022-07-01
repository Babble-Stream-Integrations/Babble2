import express, { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import axios from "axios";
import userRoutes from "./routes/userRoutes";
import addonRoutes from "./routes/addonRoutes";
import authRoutes from "./routes/authRoutes";
import { verifyAppCheck } from "./config/firebase";

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
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, DELETE, PATCH, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,appchecktoken"
  );
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

app.use(async (req, res, next) => {
  const appCheckToken = req.header("appchecktoken");
  if (appCheckToken === undefined) {
    functions.logger.log("appcheck: missing");
    // uncomment the next line to enforce the appcheck instead of only logging it. (don't forget the same line in the try block where the token is actually validated).
    // return res.status(400).send({ error: "Missing appcheck token" });
    return next();
  }
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  try {
    await verifyAppCheck(appCheckToken);
    functions.logger.log("appcheck: valid");
  } catch (err) {
    functions.logger.log("appcheck: invalid");
    functions.logger.log(err);
    // uncomment the next line to enforce the appcheck instead of only logging it.
    // return res.status(400).send({ error: "Invalid appcheck token" });
  }
  return next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", addonRoutes);
app.use("/api/v1", authRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status || 400;
    const message = err.response?.data || err.message;
    return res.status(status).send(message);
  }

  return res.status(400).send(err.message);
});

app.get("/", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

export default functions.region("europe-west1").https.onRequest(app);
