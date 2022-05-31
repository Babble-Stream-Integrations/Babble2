import db from "../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

// Functie om styling data op te halen uit de firestore en doormiddel van setStylingState op te slaan in state die in AddonVisual staat.
export async function getAddonStyling(
  user: string,
  addon: string,
  setStylingState: Dispatch<SetStateAction<object>>
) {
  const docRef = doc(db, "users", user, "addons", addon);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return setStylingState(docSnap.data()["styling"]);
  } else {
    return console.log("Error finding data");
  }
}
