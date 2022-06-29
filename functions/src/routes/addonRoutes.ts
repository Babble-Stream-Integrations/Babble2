import express from "express";
import * as addonController from "../controllers/addonController";

const router = express.Router();

router.post("/raffle/start", addonController.runRaffle);
router.post("/autoTitle/start", addonController.runAutoTitle);

export default router;
