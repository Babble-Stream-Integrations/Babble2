import firebase from "firebase-admin"
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const RTDBApp = initializeApp({databaseURL: "https://babble-d6ef3-default-rtdb.europe-west1.firebasedatabase.app"}, 'RTDBApp');

const realtimeDB = getDatabase(RTDBApp);
const DBref = firebase.database().ref();
const test3 = 'testtesttest'
// input functie id: string, duration: bigint
async function start() {
	DBref.child(test3).set({
			werkend:'true',
			errors:'hopelijk niet'
	});
}

export default {
	// connect,
	// disconnect,
	start,
	// end,
};
