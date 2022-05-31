import db from "../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction } from "react";

export async function getAddonStyling(
  user: string,
  addon: string,
  setStylingState: Dispatch<SetStateAction<object>>
) {
  const docRef = doc(db, "users", user, "addons", addon);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // return console.log("Document data:", docSnap.data());
    return setStylingState(docSnap.data()["styling"]);
  } else {
    // doc.data() will be undefined in this case
    return console.log("No such document!");
  }
}
