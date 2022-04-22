import express, { Request } from "express";
import path from "path";
// import getFirestore from "firebase-admin/firestore";
// const db = getFirestore();
import Sse from "../services/serverSentEvents";

const router = express.Router();

router.get("/raffle", async (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
router.get(
  "/raffle/listen",
  async (req: Request<unknown, unknown, unknown, { id: string }>, res) => {
    const { id } = req.query;
    Sse.connect(id, res);
    req.on("close", Sse.disconnect.bind(id));
  }
);

export default router;
