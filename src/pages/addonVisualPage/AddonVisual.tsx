import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAddonStyling } from "./getAddonStyling";

function AddonVisual() {
  const [addonStyling, setAddonStyling] = useState({});
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
        getAddonStyling(
          searchParams.get("user"),
          searchParams.get("addon"),
          setAddonStyling
        ).catch(console.error);
      } else {
        navigate("../../invalidlink", { replace: true });
      }
    } else {
      navigate("../invalidlink", { replace: true });
    }
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default AddonVisual;
