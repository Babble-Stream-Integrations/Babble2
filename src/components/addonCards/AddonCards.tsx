import { useEffect, useState } from "react";
import AddonCard from "../addonCard/AddonCard";
import db from "../../firebase/Firebase";
import { collection, collectionGroup, onSnapshot } from "firebase/firestore";
import "./AddonCards.css";

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

interface Type {
  types: string;
}

const AddonCards = ({ types }: Type) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addoncards, setAddons] = useState<any[]>([]);
  const [tijdelijk, setTijdelijk] = useState<any[]>([]);
  const [originals] = useState<any[]>([]);
  const [toolkits] = useState<any[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, "addonTemplates"), (snapshot) => {
      setAddons(snapshot.docs.map((doc) => doc.data()));
      console.log(types);
      // checkType();
    });
  }, []);

  // function checkType() {
  //   if (types == "original") {
  //     addoncards.forEach((addoncard) => {
  //       for (const key in addoncard) {
  //         if (key == "type" && addoncard[key] == "original") {
  //           // console.log(addoncard);
  //           // console.log(addoncard[key]);
  //           originals.push(addoncard);
  //           // console.log(originals);
  //         }
  //         // console.log(originals);
  //         setTijdelijk(originals);
  //       }
  //     });
  //   } else if (types == "toolkit") {
  //     addoncards.forEach((addoncard) => {
  //       for (const key in addoncard) {
  //         if (key == "type" && addoncard[key] == "toolkit") {
  //           // console.log(addoncard);
  //           // console.log(addoncard[key]);
  //           toolkits.push(addoncard);
  //           // console.log(originals);
  //         }
  //         // console.log(originals);
  //         setTijdelijk(toolkits);
  //       }
  //     });
  //   } else {
  //     console.log("fail");
  //   }

  //   // addoncards.forEach((addoncard) => {
  //   //   if (types == "original") {
  //   //     for (const key in addoncard) {
  //   //       if (key == "type" && addoncard[key] == "original") {
  //   //         // console.log(addoncard);
  //   //         // console.log(addoncard[key]);
  //   //         originals.push(addoncard);
  //   //         // console.log(originals);
  //   //       }
  //   //     }
  //   //     // console.log(originals);
  //   //     setAddons(originals);
  //   //   } else if (types == "toolkit") {
  //   //     for (const key in addoncard) {
  //   //       if (key == "type" && addoncard[key] == "toolkit") {
  //   //         // console.log(addoncard);
  //   //         // console.log(addoncard[key]);
  //   //         toolkits.push(addoncard);
  //   //         // console.log(toolkits);
  //   //       }
  //   //     }
  //   //     setAddons(toolkits);
  //   //     // console.log(toolkits);
  //   //   }
  //   // });

  //   // console.log(originals);
  //   // console.log(toolkits);
  //   console.log(addoncards);

  //   // tijdelijk.sort(function (a, b) {
  //   //   return Number(a.order) - Number(b.order);
  //   // });
  // }
  return (
    <div className="addonCards">
      {/* {tijdelijk.length > 0
        ? tijdelijk.map((addoncard: IAddonData, index: number) => (
            <AddonCard key={index} card={addoncard} />
          ))
        : "No cards to show"} */}
      {addoncards.length > 0
        ? addoncards.map((addoncard: IAddonData, index: number) => (
            <AddonCard key={index} card={addoncard} />
          ))
        : "No cards to show"}
    </div>
  );
};

export default AddonCards;
