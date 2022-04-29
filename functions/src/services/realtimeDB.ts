import firebase from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const RTDBApp = initializeApp(
  {
    databaseURL:
      "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app",
  },
  "RTDBApp"
);

const realtimeDB = getDatabase(RTDBApp);
const DBref = firebase.database().ref();
// input functie id: string, duration: bigint
async function RTDBStart(id: string, duration: bigint) {
  DBref.child(id).set({
    type: "start",
    duration,
  });
}

async function RTDBEnd(id: string, winners: string[]) {
  DBref.child(id).set({
    type: "end",
    winners,
  });
}

async function RTDBIdle(id: string) {
  DBref.child(id).set({
    type: "idle",
  });
}

export default {
  RTDBStart,
  RTDBEnd,
  RTDBIdle,
};
