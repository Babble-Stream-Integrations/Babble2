import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAddonStyling } from "./getAddonStyling";
import Raffle from "../../components/addonCollection/raffle/Raffle";
import { onSnapshot, doc } from "firebase/firestore";
import db from "../../firebase/Firebase";

function AddonVisual() {
  const [addonData, setAddonData] = useState({});
  const [dataRecieved, setDataRecieved] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.search !== "") {
      if (
        location.search.match(/user=([^&]*)/g) &&
        location.search.match(/user=([^&]*)/g)?.length === 1 &&
        location.search.match(/addon=([^&]*)/g) &&
        location.search.match(/addon=([^&]*)/g)?.length === 1
      ) {
        const params = location.search;
        const searchParams = new URLSearchParams(params);
        // getAddonStyling(
        //   searchParams.get("user") || "",
        //   searchParams.get("addon") || "",
        //   setAddonData
        // )
        //   .then(() => {
        //     if (addonData !== {}) setDataRecieved(true);
        //   })
        //   .catch(() => {
        //     console.error;
        //     alert(
        //       "An error while fetching data has occured. Please check if your URL is correct"
        //     );
        //   });
        onSnapshot(
          doc(
            db,
            "users",
            searchParams.get("user") || "",
            "addons",
            searchParams.get("addon") || ""
          ),
          (snapshot) => {
            const snapData = snapshot.data();
            if (snapData !== undefined) {
              const stateData = {
                uniqueString: snapData["uniqueString"],
                styling: snapData["styling"],
                enterMessage: snapData["settings"]["enterMessage"],
              };
              setAddonData(stateData);
              setDataRecieved(true);
            }
          }
        );
      } else {
        navigate("../../invalidlink", { replace: true });
      }
    } else {
      navigate("../invalidlink", { replace: true });
    }
  }, []);

  return (
    <>
      {dataRecieved && <Raffle dataRecieved={dataRecieved} data={addonData} />}
    </>
  );
}

export default AddonVisual;
