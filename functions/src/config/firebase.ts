import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
async function verifyAppCheck(appCheckToken: string) {
  admin.appCheck().verifyToken(appCheckToken);
}

export { db, verifyAppCheck };
