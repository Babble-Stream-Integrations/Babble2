import db from "../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

// Functie om styling data op te halen uit de firestore en doormiddel van setStylingState op te slaan in state die in AddonVisual staat.
export async function getAddonStyling(
  user: string,
  addon: string,
  setDataState: Dispatch<SetStateAction<object>>
) {
  const docRef = doc(db, "users", user, "addons", addon);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const stateData = {
      uniqueString: docSnap.data()["uniqueString"],
      styling: docSnap.data()["styling"],
    };
    return setDataState(stateData);
  } else {
    return alert(
      "An error while fetching data has occured. Please check if your URL is correct"
    );
  }
}
