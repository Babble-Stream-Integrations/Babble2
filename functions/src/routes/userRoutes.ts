import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// User routes
router.get("/users", userController.getAllUsers);
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
