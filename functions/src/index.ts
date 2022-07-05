import express, { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import axios from "axios";
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
  const origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://babble.streamintegrations.com",
    "https://dev-babble.web.app",
  ];
  const origin = origins.includes(req.headers.origin ?? "")
    ? req.headers.origin!
    : "";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status || 400;
    const message = err.response?.data || err.message;
    return res.status(status).send({ error: message });
  }

  const status = err.message.includes("not found") ? 404 : 400;
  return res.status(status).send({ error: err.message });
});

app.get("/", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

export default functions.region("europe-west1").https.onRequest(app);
