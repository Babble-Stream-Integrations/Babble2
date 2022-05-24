import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddonVisual() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname, location.search);
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default AddonVisual;
