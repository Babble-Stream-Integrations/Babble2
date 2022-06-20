import express, { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import userRoutes from "./routes/userRoutes";
import addonRoutes from "./routes/addonRoutes";
import authRoutes from "./routes/authRoutes";

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
    "GET, PUT, DELETE, PATCH, POST"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", addonRoutes);
app.use("/api/v1", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).send(err.message);
  } else {
    next(err);
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

export default functions.region("europe-west1").https.onRequest(app);
