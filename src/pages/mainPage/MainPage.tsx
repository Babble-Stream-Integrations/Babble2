import React from "react";
import { getAppcheck } from "../../firebase/Firebase";

function MainPage() {
  return (
    <div>
      <div>
        <p style={{ color: "white" }}>
          This is de index pagina van Babble streaming integrations!
          <button
            onClick={async () => {
              const appchecktoken = await getAppcheck();
              console.log(appchecktoken);
              fetch(
                "https://europe-west1-babble-d6ef3.cloudfunctions.net/default/",
                {
                  headers: {
                    Origin: "https://dev-babble.web.app",
                    appchecktoken: appchecktoken,
                  },
                }
              ).then((response) => {
                console.log(response);
              });
            }}
          >
            testbutton
          </button>
        </p>
      </div>
    </div>
  );
}

export default MainPage;
