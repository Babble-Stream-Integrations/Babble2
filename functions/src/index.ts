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
 *     Platforms:
 *       type: string
 *       description: Available platforms
 *       enum: [twitch, youtube]
 *     Addons:
 *       type: string
 *       description: Available addonTypes
 *       enum: [raffleSystem, automaticStreamTitle]
 *
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *       properties:
 *         displayName:
 *           type: string
 *           description: Automatically defined full name of Google Account
 *         email:
 *           type: string
 *           description: Automatically defined email of Google Account
 *       example:
 *         displayName: Joas Boevink
 *         email: joas.boevink@gmail.com
 *
 *     Addon:
 *       type: object
 *       required:
 *         - platform
 *         - settings
 *         - styling
 *         - type
 *         - uniqueString
 *       properties:
 *         platform:
 *           $ref: '#/components/schemas/Platforms'
 *         settings:
 *           $ref: '#/components/schemas/AddonSettings'
 *         styling:
 *           $ref: '#/components/schemas/AddonStyling'
 *         type:
 *           $ref: '#/components/schemas/Addons'
 *         uniqueString:
 *           type: string
 *           description: Automatically generated string used for creating a unique link for the OBS browser source
 *
 *     AddonStyling:
 *       type: object
 *       required:
 *         - backgroundColor
 *         - borderColor
 *         - borderRadius
 *         - borderSize
 *         - iconColor
 *         - position
 *         - primaryTextColor
 *         - primaryTextColor
 *         - scale
 *         - secondaryTextColor
 *         - secondaryTextFont
 *       properties:
 *         backgroundColor:
 *           type: string
 *         borderColor:
 *           type: string
 *         borderRadius:
 *           type: string
 *         borderSize:
 *           type: string
 *         iconColor:
 *           type: string
 *         position:
 *           type: number
 *         primaryTextColor:
 *           type: string
 *         primaryTextFont:
 *           type: string
 *         scale:
 *           type: number
 *         secondaryTextColor:
 *           type: string
 *         secondaryTextFont:
 *           type: string
 *
 *     AddonSettings:
 *       oneOf:
 *         - $ref: '#/components/schemas/TwitchRaffleSettings'
 *         - $ref: '#/components/schemas/YoutubeRaffleSettings'
 *         - $ref: '#/components/schemas/AutoTitleSettings'
 *
 *     RaffleSettings:
 *       type: object
 *       required:
 *         - announceWinners
 *         - duplicateWinners
 *         - duration
 *         - enterMessage
 *         - useMyAccount
 *         - winnerAmount
 *       properties:
 *         announceWinners:
 *           type: boolean
 *           description: Announce the winners in the chat or only in the visual
 *         duplicateWinners:
 *           type: boolean
 *           description: Allow users to win multiple times (possible due to privilege chance)
 *         duration:
 *           type: number
 *           description: Amount of time for the raffle to run before selecting winners
 *         enterMessage:
 *           type: string
 *           description: The message users need to type to enter the raffle
 *         useMyAccount:
 *           type: boolean
 *           description: Send automated chat messages with the streamer account or a Babble bot account
 *         winnerAmount:
 *           type: number
 *           description: Amount of possible winners
 *
 *
 *     TwitchRaffleSettings:
 *       allOf:
 *         - $ref: '#/components/schemas/RaffleSettings'
 *         - type: object
 *           required:
 *             - followOnly
 *             - followPrivilege
 *             - subOnly
 *             - subPrivilege
 *           properties:
 *             followOnly:
 *                type: boolean
 *                description: Only allow followers to enter the raffle
 *             followPrivilege:
 *                type: number
 *                description: Increase chance of winning for followers
 *             subOnly:
 *                type: boolean
 *                description: Only allow subscribers to enter the raffle
 *             subPrivilege:
 *                type: number
 *                description: Increase chance of winning for subscribers
 *
 *     YoutubeRaffleSettings:
 *       allOf:
 *         - $ref: '#/components/schemas/RaffleSettings'
 *         - type: object
 *           required:
 *             - subOnly
 *             - subPrivilege
 *             - memberOnly
 *             - memberPrivilege
 *           properties:
 *             subOnly:
 *                type: boolean
 *                description: Only allow subscribers to enter the raffle
 *             subPrivilege:
 *                type: number
 *                description: Increase chance of winning for subscribers
 *             memberOnly:
 *                type: boolean
 *                description: Only allow members to enter the raffle
 *             memberPrivilege:
 *                type: number
 *                description: Increase chance of winning for members
 *
 *     AutoTitleSettings:
 *       type: object
 *       required:
 *         - changeGame
 *         - steamId
 *       properties:
 *         changeGame:
 *           type: boolean
 *           description: Change the stream directory based on the Steam game the streamer is playing (Twitch Only)
 *         customTitle:
 *           type: string
 *           description: Change the stream title based on the Steam game the streamer is playing. This is a string with custom Babble variables defined as ${variable} (Currently available variables -> gameName, achievementsTotal, achievementsAchieved, achievementsLeft)
 *         justChatting:
 *           type: boolean
 *           description: Change the stream directory to Just Chatting when no Steam game is detected. Only works when the changeGame property is true (Twitch Only)
 *         steamAPIKey:
 *           type: string
 *           description: Personal Steam API Key to use the addon with a private Steam account
 *         steamId:
 *           type: string
 *           description: Steam ID of the streamer's Steam Account
 *
 *     Tokens:
 *       oneOf:
 *         - $ref: '#/components/schemas/TwitchTokens'
 *
 *     TwitchTokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *         - scope
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Automatically generated by Twitch
 *         refreshToken:
 *           type: string
 *           description: Automatically generated by Twitch
 *         scope:
 *           type: array
 *           items:
 *             type: string
 *           description: Combined scopes of every addon the user has given permission of
 */
