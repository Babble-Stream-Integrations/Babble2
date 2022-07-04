import express from "express";
import * as addonController from "../controllers/addonController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addon
 *   description: AddonControl Routes
 */
router.post("/raffle/start", addonController.runRaffle);
router.post("/autoTitle/start", addonController.runAutoTitle);

export default router;
