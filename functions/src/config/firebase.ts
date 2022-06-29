import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL:
    "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();

async function verifyAppCheck(appCheckToken: string) {
  admin.appCheck().verifyToken(appCheckToken);
}

export { db, verifyAppCheck };
