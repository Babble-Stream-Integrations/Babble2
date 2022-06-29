import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL:
    "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app",
});
export default admin.firestore();
