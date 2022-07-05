import express from "express";
import db from "../config/firebase";
import * as userController from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 *   components:
 *     parameters:
 *       user:
 *         in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: The User's UUID
 *         example: zDdxO4Pok8b5UeVTUny2RbD1S6A9
 */
router.param("user", async (req, res, next, user) => {
  if (req.method === "PUT") {
    return next();
  }
  const doc = await db.doc(`users/${user}`).get();
  if (!doc.exists) {
    return next(new Error("User document not found"));
  }
  req.user = user;
  return next();
});

/**
 * @swagger
 *   components:
 *     parameters:
 *       addon:
 *         in: path
 *         name: addon
 *         schema:
 *           type: string
 *         required: true
 *         description: The given Name of an Addon
 *         example: MyRaffleAddon2
 */
router.param("addon", async (req, res, next, addon) => {
  if (req.method === "PUT") {
    return next();
  }
  const doc = await db.doc(`users/${req.params.user}/addons/${addon}`).get();
  if (!doc.exists) {
    return next(new Error("Addon document not found"));
  }
  req.addon = addon;
  return next();
});

/**
 * @swagger
 *   components:
 *     parameters:
 *       platform:
 *         in: path
 *         name: platform
 *         schema:
 *           type: string
 *         required: true
 *         description: The platform of the Tokens
 *         example: twitch
 */
router.param("platform", async (req, res, next, platform) => {
  if (req.method === "PUT") {
    return next();
  }
  const doc = await db.doc(`users/${req.params.user}/tokens/${platform}`).get();
  if (!doc.exists) {
    return next(new Error("Token document not found"));
  }
  req.platform = platform;
  return next();
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Routes
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all User ID's
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of User UUID's
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: [zDdxO4Pok8b5UeVTUny2RbD1S6A3, jhKgqzIm8xcYZIgw8B2SRFsntrp1]
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /users/{user}:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *   put:
 *     summary: Add a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: user zDdxO4Pok8b5UeVTUny2RbD1S6A9 added to database!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   get:
 *     summary: Get a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A User object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: user zDdxO4Pok8b5UeVTUny2RbD1S6A9 deleted to database!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 */
router.put("/users/:user", userController.addUser);
router.get("/users/:user", userController.getUser);
router.delete("/users/:user", userController.deleteUser);

/**
 * @swagger
 * /users/{user}/addons:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *   get:
 *     summary: Get a list of all addons of a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of Addon titles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: [MyRaffleAddon2, AutoTitleTurtle]
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/users/:user/addons", userController.getAllAddons);

/**
 * @swagger
 * /users/{user}/addons/{addon}:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *     - $ref: '#/components/parameters/addon'
 *   put:
 *     summary: Add an Addon to a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Addon'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: addon MyRaffleAddon2 added to zDdxO4Pok8b5UeVTUny2RbD1S6A9!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *   get:
 *     summary: Get an Addon of a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: An Addon object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Addon'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete an Addon of a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: addon MyRaffleAddon2 deleted from zDdxO4Pok8b5UeVTUny2RbD1S6A9!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/users/:user/addons/:addon", userController.addAddon);
router.get("/users/:user/addons/:addon", userController.getAddon);
router.delete("/users/:user/addons/:addon", userController.deleteAddon);

/**
 * @swagger
 * /users/{user}/addons/{addon}/settings:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *     - $ref: '#/components/parameters/addon'
 *   patch:
 *     summary: Update the settings of an Addon of a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddonSettings'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: addon MyRaffleAddon2 settings updated in zDdxO4Pok8b5UeVTUny2RbD1S6A9!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch(
  "/users/:user/addons/:addon/settings",
  userController.updateAddonSettings
);

/**
 * @swagger
 * /users/{user}/tokens/{platform}:
 *   parameters:
 *     - $ref: '#/components/parameters/user'
 *     - $ref: '#/components/parameters/platform'
 *   put:
 *     summary: Add tokens of a specific platform to a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tokens'
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
 *   delete:
 *     summary: Delete tokens of a specific platform to a User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: twitch tokens deleted from zDdxO4Pok8b5UeVTUny2RbD1S6A9!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/users/:user/tokens/:platform", userController.addTokens);
router.delete("/users/:user/tokens/:platform", userController.deleteTokens);

export default router;
