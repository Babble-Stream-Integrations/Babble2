import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get("/getAuthCode/:user/:platform/:addonType", authController.getCode);
router.post("/setAccessTokens/:user/:platform/:code", authController.setTokens);

export default router;
