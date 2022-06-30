import express, { NextFunction, Request, Response } from "express";
// import * as functions from "firebase-functions";
import axios from "axios";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import userRoutes from "./routes/userRoutes";
import addonRoutes from "./routes/addonRoutes";
import authRoutes from "./routes/authRoutes";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Babble API",
      version: "1.0.0",
      description: "Babble's API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./functions/lib/routes/*.js", "./functions/lib/index.js"],
};

const swaggerDocs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

// export default functions.region("europe-west1").https.onRequest(app);
app.listen(5000, () => {
  console.log(`Api docs listening on port 5000`);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Addons:
 *       type: string
 *       enum: [raffleSystem, automaticStreamTitle]
 *     Platforms:
 *       type: string
 *       enum: [twitch, youtube]
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *       properties:
 *         displayName:
 *           type: string
 *           description: The Full Name of the User's Google Account
 *         email:
 *           type: string
 *           description: The User's Google Mail
 *       example:
 *         displayName: Joas Boevink
 *         email: joas.boevink@gmail.com
 *
 *     Addon:
 *       type: object
 *       properties:
 *         platform:
 *           $ref: '#/components/schemas/Platforms'
 *         settings:
 *           type: string
 *         styling:
 *           type: string
 *         type:
 *           $ref: '#/components/schemas/Addons'
 *         uniqueString:
 *           type: string
 *
 *
 */
