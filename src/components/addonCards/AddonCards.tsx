import { useEffect, useState } from "react";
import AddonCard from "../addonCard/AddonCard";
import db from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";

export interface IsAddonData {
  title: string;
  order: number;
  color: string;
}

export interface AddonData {
  [key: string]: IsAddonData;
}

const AddonCards = () => {
  const [addoncards, setAddons] = useState<AddonData[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
      setAddons(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  addoncards.sort(function (a, b) {
    return Number(a.order) - Number(b.order);
  });

  return (
    <>
      {addoncards.map((addoncard: AddonData, index: number) => (
        <AddonCard key={index} card={addoncard} />
      ))}
    </>
  );
};

export default AddonCards;
