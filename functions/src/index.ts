import express, { NextFunction, Request, Response } from "express";
import * as functions from "firebase-functions";
import axios from "axios";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes";
import addonRoutes from "./routes/addonRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.static("public"));

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

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
    },
  },
  // ['.routes/*.js']
  apis: ["index.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

app.get("/hi", (_req: Request, res: Response) => {
  res.send({
    result: "hi there handsome ;)",
  });
});

app.get("/docs", (req, res) => {
  res.sendFile("index.html");
});

export default functions.https.onRequest(app);
