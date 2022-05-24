import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddonVisual() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.search !== "") {
      if (
        location.search.match(/user=([^&]*)/g) &&
        location.search.match(/user=([^&]*)/g).length === 1 &&
        location.search.match(/addon=([^&]*)/g) &&
        location.search.match(/addon=([^&]*)/g).length === 1
      ) {
        console.log("match");
      } else {
        navigate("../../invalidlink", { replace: true });
        console.log("Back to start!");
      }
    } else {
      navigate("../invalidlink", { replace: true });
      console.log("Back to start!");
    }
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default AddonVisual;
