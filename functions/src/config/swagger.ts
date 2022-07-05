import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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
        url: "https://europe-west1-babble-d6ef3.cloudfunctions.net/default/api/v1",
        description: "Production Server",
      },
      {
        url: "http://localhost:5001/babble-d6ef3/europe-west1/default/api/v1",
        description: "Localhost",
      },
    ],
  },
  apis: ["./lib/config/swagger.js", "./lib/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(5000, () => {
  console.log(`Api docs listening on port 5000`);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Platforms:
 *       type: string
 *       Available platforms: [twitch, youtube]
 *       example: twitch
 *     Addons:
 *       type: string
 *       Available addonTypes: [raffleSystem, automaticStreamTitle]
 *       example: raffleSystem
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
 *           example: zDdxO4Pok8b5UeVTUny2RbD1S6A1
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
 *         - primaryTextFont
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
 *       example:
 *         backgroundColor: "#f2f2f4"
 *         borderColor:
 *         borderRadius: 30px
 *         borderSize: 0px
 *         iconColor: "#000000"
 *         position: 11
 *         primaryTextColor: "#000000"
 *         primaryTextFont:
 *         scale: 1
 *         secondaryTextColor: "#000000"
 *         secondaryTextFont:
 *
 *     AddonSettings:
 *       oneOf:
 *         - $ref: '#/components/schemas/TwitchRaffleSettings'
 *         - $ref: '#/components/schemas/YoutubeRaffleSettings'
 *         - $ref: '#/components/schemas/AutoTitleSettings'
 *
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
 *       example:
 *         announceWinners: true
 *         duplicateWinners: false
 *         duration: 60
 *         enterMessage: "!join"
 *         useMyAccount: true
 *         winnerAmount: 1
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
 *           example:
 *             followOnly: false
 *             followPrivilege: 2
 *             subOnly: false
 *             subPrivilege: 3
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
 *           example:
 *             subOnly: false
 *             subPrivilege: 2
 *             memberOnly: false
 *             memberPrivilege: 3
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
 *       example:
 *         changeGame: true
 *         customTitle: Hello handsome 😉 | ${gameName} | ${achievementsLeft} achievements to go!
 *         justChatting: false
 *         steamId: 76561198278073267
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
 *       example:
 *         accessToken: 1r73n4r46u2kukvydhct9wl7l79qtx
 *         refreshToken: la5mssq5gnqzlzyx1kb32628va69gx1wm43oww9ekit0xs2ibs
 *         scope: [channel:manage:broadcast, chat:edit, chat:read]
 *
 *
 *     Result:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             error: User document not found
 *
 */
