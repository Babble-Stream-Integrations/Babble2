import express, { Request } from "express";
import path from "path";
// import getFirestore from "firebase-admin/firestore";
// const db = getFirestore();
import Sse from "../services/serverSentEvents";
import RTDB from "../services/realtimeDB";

const router = express.Router();

router.get("/raffle", async (req, res) => {
  res.sendFile("index.html", { root: "../functions" });
});
router.get(
  "/raffle/listen",
  async (req: Request<unknown, unknown, unknown, { id: string }>, res) => {
    const { id } = req.query;
    // Sse.connect(id, res);
    // req.on("close", Sse.disconnect.bind(id));
    // RTDB.start(id);
  }
);

export default router;
