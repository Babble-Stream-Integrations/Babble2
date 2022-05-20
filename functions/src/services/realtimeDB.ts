import firebase from "firebase-admin";

const RTDBApp = firebase.initializeApp(
  {
    databaseURL:
      "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app",
  },
  "RTDBApp"
);

firebase.database(RTDBApp);
const DBref = firebase.database().ref();

async function RTDBStart(id: string, duration: number) {
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

export { RTDBStart, RTDBEnd, RTDBIdle };
