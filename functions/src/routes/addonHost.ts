import express from "express";

const router = express.Router();

router.get("/raffle", async (req, res) => {
  res.sendFile("index.html", { root: "../functions" });
});

export default router;
