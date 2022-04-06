import express from "express";
import path from "path";
// import getFirestore from "firebase-admin/firestore";
import { Query } from "express-serve-static-core";
// const db = getFirestore();
import Sse from "../services/serverSentEvents";

export interface TypedRequestQuery<T extends Query> extends Express.Request {
    on: any;
    query: T;
}

const router = express.Router();

router.get('/raffle', async (req, res) => {res.sendFile(path.join(__dirname, '/index.html'))});
router.get('/raffle/listen', async (req: TypedRequestQuery<{id:string}>, res) => {
	const id = req.query.id;
	Sse.connect(id, res);
	req.on("close", Sse.disconnect.bind(id));
});

export default router;