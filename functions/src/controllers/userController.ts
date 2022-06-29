import { Request, Response } from "express";
import * as userDb from "../db/userDb";

// User routes
export const getAllUsers = async (req: Request, res: Response) => {
  const userList = await userDb.getAllUsers();
  return res.send(userList);
};

export const addUser = async (req: Request, res: Response) => {
  await userDb.addUser(req.params.user, req.body);
  return res.send({ result: `user ${req.user} added to database!` });
};

export const getUser = async (req: Request, res: Response) => {
  const { user } = req.params;
  const userData = await userDb.getUser(user);
  return res.send(userData);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { user } = req.params;
  await userDb.deleteUser(user);
  return res.send({ results: `user ${user} deleted from database!` });
};

export const getAllAddons = async (req: Request, res: Response) => {
  const { user } = req.params;
  const addonList = await userDb.getAllAddons(user);
  return res.send(addonList);
};

export const addAddon = async (req: Request, res: Response) => {
  const { user, addon } = req.params;
  await userDb.addAddon(user, addon, req.body);
  return res.send({ result: `addon ${addon} added to ${user}` });
};

export const getAddon = async (req: Request, res: Response) => {
  const { user, addon } = req.params;
  const addonData = await userDb.getAddon(user, addon);
  return res.send(addonData);
};

export const deleteAddon = async (req: Request, res: Response) => {
  const { user, addon } = req.params;
  await userDb.deleteAddon(user, addon);
  return res.send({ result: `addon ${addon} deleted from ${user}` });
};

export const updateAddonSettings = async (req: Request, res: Response) => {
  const { user, addon } = req.params;
  await userDb.updateAddonSettings(user, addon, req.body);
  return res.send({ result: `addon ${addon} settings updated in ${user}` });
};

export const addTokens = async (req: Request, res: Response) => {
  const { user, platform } = req.params;
  await userDb.addTokens(user, platform, req.body);
  return res.send({ result: `${platform} tokens added to ${user}` });
};

export const deleteTokens = async (req: Request, res: Response) => {
  const { user, platform } = req.params;
  await userDb.deleteTokens(user, platform);
  return res.send({ result: `${platform} tokens deleted from ${user}` });
};
