import express from "express";
import * as addonController from "../controllers/addonController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addon
 *   description: AddonControl Routes
 *
 * components:
 *   schemas:
 *     RunAddon:
 *       type: object
 *       required:
 *         - user
 *         - addon
 *       properties:
 *         user:
 *           type: string
 *         addon:
 *           type: string
 */

/**
 * @swagger
 * /raffle/start:
 *   post:
 *     summary: Start a RaffleSystem Addon of a specified User
 *     tags: [Addon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RunAddon'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: Twitch raffle has been succesfully finished!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/raffle/start", addonController.runRaffle);

/**
 * @swagger
 * /autotitle/start:
 *   post:
 *     summary: Start a AutomaticStreamTitle Addon of a specified User
 *     tags: [Addon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RunAddon'
 *           example:
 *             user: zDdxO4Pok8b5UeVTUny2RbD1S6A9
 *             addon: AutoTitleTurtle
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *             example:
 *               result: Twitch autoTitle has been succesfully finished!
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/autoTitle/start", addonController.runAutoTitle);

export default router;
