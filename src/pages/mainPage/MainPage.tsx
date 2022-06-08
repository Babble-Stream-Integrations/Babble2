import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/addons", { replace: true });
  }, []);
  return (
    <div>
      <div>
        <p style={{ color: "white" }}>
          This is de index pagina van Babble streaming integrations!
        </p>
      </div>
    </div>
  );
}

export default MainPage;
