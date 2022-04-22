import { getDatabase, ref, set } from "firebase/database";

const realtimeDB = getDatabase(
  "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app"
);
