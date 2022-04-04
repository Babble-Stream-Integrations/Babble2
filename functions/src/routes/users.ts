import express, { Request, Response } from "express";
// import admin from "firebase-admin";
import firestore from "../services/firestore";

const router = express.Router();

// const db = admin.firestore();

// // Parameteres
// router.param("user", async function (req, res, next, user) {
//   if (req.method === "PUT") {
//     req.user = user;
//     next();
//   } else {
//     const doc = await db.collection("users").doc(user).get();
//     if (doc.exists) {
//       req.user = user;
//       next();
//     } else {
//       next(new Error("user document not found"));
//     }
//   }
// });

// router.param("addon", async function (req, res, next, addon) {
//   if (req.method === "PUT") {
//     req.addon = addon;
//     next();
//   } else {
//     const doc = await db
//       .collection("users")
//       .doc(req.user)
//       .collection("addons")
//       .doc(addon)
//       .get();
//     if (doc.exists) {
//       req.addon = addon;
//       next();
//     } else {
//       next(new Error("addon document not found"));
//     }
//   }
// });

// router.param("platform", async function (req, res, next, platform) {
//   if (req.method === "PUT") {
//     req.platform = platform;
//     next();
//   } else {
//     const doc = await db
//       .collection("users")
//       .doc(req.user)
//       .collection("tokens")
//       .doc(platform)
//       .get();
//     if (doc.exists) {
//       req.platform = platform;
//       next();
//     } else {
//       next(new Error("token document not found"));
//     }
//   }
// });

// // User routes
// router.get("/users", async (req, res) => {
//   res.send(await firestore.getUsers());
// });
// router.put("/users/:user", async (req, res) => {
//   res.send(await firestore.addUser(req.user, req.body));
// });
router.get("/user", async (req: Request, res: Response) => {
  // const test = firestore.getUser("shyryhsryhr");
  // console.log(test);
  console.log(req.query);

  res.send({ results: "yay" });
});
// router.delete("/users/:user", async (req, res) => {
//   res.send(await firestore.deleteUser(req.user));
// });

// // UserAddon routes
// router.get("/users/:user/addons", async (req, res) => {
//   res.send(await firestore.getAddons(req.user));
// });
// router.put("/users/:user/addons/:addon", async (req, res) => {
//   res.send(await firestore.addAddon(req.user, req.addon, req.body));
// });
// router.get("/users/:user/addons/:addon", async (req, res) => {
//   res.send(await firestore.getAddon(req.user, req.addon));
// });
// router.delete("/users/:user/addons/:addon", async (req, res) => {
//   res.send(await firestore.deleteAddon(req.user, req.addon));
// });
// router.put("/users/:user/addons/:addon/settings", async (req, res) => {
//   res.send(await firestore.updateSettings(req.user, req.addon, req.body));
// });
// router.get("/users/:user/addons/:addon/settings", async (req, res) => {
//   res.send(await firestore.getSettings(req.user, req.addon));
// });

// // UserTokens routes
// router.get("/users/:user/tokens", async (req, res) => {
//   res.send(await firestore.getTokens(req.user));
// });
// router.put("/users/:user/tokens/:platform", async (req, res) => {
//   res.send(await firestore.addToken(req.user, req.platform, req.body));
// });
// router.get("/users/:user/tokens/:platform", async (req, res) => {
//   res.send(await firestore.getToken(req.user, req.platform));
// });
// router.delete("/users/:user/tokens/:platform", async (req, res) => {
//   res.send(await firestore.deleteToken(req.user, req.platform));
// });

export default router;
