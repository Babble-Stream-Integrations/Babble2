import express from "express";
import admin from "firebase-admin";
import firestore from "../services/firestore";

const db = admin.firestore();

const router = express.Router();

// Parameteres
router.param("user", async (req, res, next) => {
  if (req.method === "PUT") {
    next();
    return;
  }

  const doc = await db.collection("users").doc(req.params.user).get();
  if (!doc.exists) {
    next(new Error("user document not found"));
  } else {
    next();
  }
});

router.param("addon", async (req, res, next) => {
  if (req.method === "PUT") {
    next();
    return;
  }

  const doc = await db
    .collection("users")
    .doc(req.params.user)
    .collection("addons")
    .doc(req.params.addon)
    .get();
  if (!doc.exists) {
    next(new Error("addon document not found"));
  } else {
    next();
  }
});

router.param("platform", async (req, res, next) => {
  if (req.method === "PUT") {
    next();
    return;
  }

  const doc = await db
    .collection("users")
    .doc(req.params.user)
    .collection("tokens")
    .doc(req.params.platform)
    .get();
  if (!doc.exists) {
    next(new Error("token document not found"));
  } else {
    next();
  }
});

// User routes
router.get("/users", async (req, res) => {
  res.send(await firestore.getUsers());
});
router.put("/users/:user", async (req, res) => {
  res.send(await firestore.addUser(req.params.user, req.body));
});
router.get("/users/:user", async (req, res) => {
  res.send(await firestore.getUser(req.params.user));
});
router.delete("/users/:user", async (req, res) => {
  res.send(await firestore.deleteUser(req.params.user));
});

// UserAddon routes
router.get("/users/:user/addons", async (req, res) => {
  res.send(await firestore.getAddons(req.params.user));
});
router.put("/users/:user/addons/:addon", async (req, res) => {
  res.send(
    await firestore.addAddon(req.params.user, req.params.addon, req.body)
  );
});
router.put("/users/:user/addons/:addon/setUniqueString", async (req, res) => {
  res.send(await firestore.setUniqueString(req.params.user, req.params.addon));
});
router.get("/users/:user/addons/:addon", async (req, res) => {
  res.send(await firestore.getAddon(req.params.user, req.params.addon));
});
router.delete("/users/:user/addons/:addon", async (req, res) => {
  res.send(await firestore.deleteAddon(req.params.user, req.params.addon));
});
router.put("/users/:user/addons/:addon/settings", async (req, res) => {
  res.send(
    await firestore.updateSettings(req.params.user, req.params.addon, req.body)
  );
});
router.get("/users/:user/addons/:addon/settings", async (req, res) => {
  res.send(await firestore.getSettings(req.params.user, req.params.addon));
});

// UserTokens routes
router.get("/users/:user/tokens", async (req, res) => {
  res.send(await firestore.getTokens(req.params.user));
});
router.put("/users/:user/tokens/:platform", async (req, res) => {
  res.send(
    await firestore.addToken(req.params.user, req.params.platform, req.body)
  );
});
router.get("/users/:user/tokens/:platform", async (req, res) => {
  res.send(await firestore.getToken(req.params.user, req.params.platform));
});
router.delete("/users/:user/tokens/:platform", async (req, res) => {
  res.send(await firestore.deleteToken(req.params.user, req.params.platform));
});

export default router;
