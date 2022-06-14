import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const realtimeFirebaseConfig = {
  databaseURL:
    "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app/",
};

const realtimeApp = initializeApp(realtimeFirebaseConfig, "rtdbapp");
export const rtdb = getDatabase(realtimeApp);
