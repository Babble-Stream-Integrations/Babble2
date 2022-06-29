import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.get("/auth/:platform/:uuid/:addonType", authController);

export default router;
