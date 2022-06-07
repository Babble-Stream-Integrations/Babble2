import { useEffect, useState } from "react";
import AddonCard from "../addonCard/AddonCard";
import db from "../../index";
import { collection, onSnapshot } from "firebase/firestore";

const AddonCards = () => {
  const [addoncards, setAddons] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
      setAddons(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  addoncards.sort(function (a, b) {
    return a.order - b.order;
  });

  return (
    <>
      {addoncards.map((addoncard) => (
        <AddonCard key={addoncard.id} card={addoncard} />
      ))}
    </>
  );
};

export default AddonCards;
