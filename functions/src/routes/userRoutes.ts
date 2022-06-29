import express from "express";
import db from "../config/firebase";
import * as userController from "../controllers/userController";

const router = express.Router();

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
 * components:
 *   schemas:
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
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Routes
 */

// User routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of all User ID's
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of User id's
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
          required: true
          description: Numeric ID of the user to get
 * /users/:
 *   get:
 *     summary: Returns a list of all User ID's
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of User id's
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.put("/users/:user", userController.addUser);
router.get("/users/:user", userController.getUser);
router.delete("/users/:user", userController.deleteUser);

// UserAddon routes
router.get("/users/:user/addons", userController.getAllAddons);
router.put("/users/:user/addons/:addon", userController.addAddon);
router.get("/users/:user/addons/:addon", userController.getAddon);
router.delete("/users/:user/addons/:addon", userController.deleteAddon);
router.patch(
  "/users/:user/addons/:addon/settings",
  userController.updateAddonSettings
);

// UserTokens routes
router.put("/users/:user/tokens/:platform", userController.addTokens);
router.delete("/users/:user/tokens/:platform", userController.deleteTokens);

export default router;
