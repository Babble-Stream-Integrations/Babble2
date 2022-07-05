import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Routes
 */

/**
 * @swagger
 * /getAuthURL/{user}/{platform}/{addonType}:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *     - $ref: '#/components/parameters/platform'
 *     - in: path
 *       name: addonType
 *       schema:
 *         type: string
 *         enum:
 *           - raffleSystem
 *           - automaticStreamTitle
 *       required: true
 *       description: The type of the Addon
 *       example: raffleSystem
 *   get:
 *     summary: Get authURL to redirect the User for receive the authorization code
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *             example:
 *               url: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.channel-memberships.creator&response_type=code&client_id=608727980458-pdo5n4tpmnbqli7o7o7r9988ct7nnc4m.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprototype
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get("/getAuthURL/:user/:platform/:addonType", authController.getURL);

/**
 * @swagger
 * /setAccessTokens/{user}/{platform}:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *     - $ref: '#/components/parameters/platform'
 *   post:
 *     summary: Set the accessTokens of a User for a specified platform with an authorization code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *           example:
 *             code: gulfwdmys5lsm6qyz4xiz9q32l10
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: twitch tokens added to zDdxO4Pok8b5UeVTUny2RbD1S6A9!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/setAccessTokens/:user/:platform", authController.setTokens);

export default router;
