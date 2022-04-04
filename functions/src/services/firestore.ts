import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

async function getUser(user: string): Promise<any> {
  const doc = await db.collection("users").doc(user).get();
  return doc.data();
}

export default { getUser };
