import { useEffect, useState } from "react";
import AddonCard from "../addonCard/AddonCard";
import db from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";

export interface IAddonData {
  title: string;
  order: number;
  color: string;
  icon: string;
  [key: string]: string | number | boolean;
}

export interface AddonData {
  [key: string]: IAddonData;
}

const AddonCards = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addoncards, setAddons] = useState<any[]>([]);

  useEffect(() => {
    // onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
    //   setAddons(snapshot.docs.map((doc) => doc.data()));
    //   console.log(snapshot.docs);
    // });
    onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
      setAddons(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  // console.log(addoncards);
  addoncards.sort(function (a, b) {
    return Number(a.order) - Number(b.order);
  });

  return (
    <>
      {addoncards.length > 0
        ? addoncards.map((addoncard: IAddonData, index: number) => (
            <AddonCard key={index} card={addoncard} />
          ))
        : "No cards to show"}
      ;
    </>
  );
};

export default AddonCards;
