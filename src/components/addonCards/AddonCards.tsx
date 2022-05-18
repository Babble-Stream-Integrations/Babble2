import { useEffect, useState } from "react";
import AddonCard from "../addonCard/AddonCard";
import db from "../../firebase/Firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

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
  const [addoncards, setAddons] = useState<any[]>([]);

  useEffect(() => {
    // onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
    //   setAddons(snapshot.docs.map((doc) => doc.data()));
    //   console.log(snapshot.docs);
    // });
    onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
      setAddons(snapshot.docs.map((doc) => doc.data()));
      console.log(Array.isArray(snapshot.docs.map((doc) => doc.data())));
    });
  }, []);
  // console.log(addoncards);
  addoncards.sort(function (a, b) {
    return Number(a.order) - Number(b.order);
  });

  return (
    <>
      {addoncards.map((addoncard: IAddonData, index: number) => (
        <AddonCard key={index} card={addoncard} />
      ))}
    </>
  );
};

export default AddonCards;
