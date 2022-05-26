// import firebase from "firebase/compat/auth";
import { useMatchMedia } from "../../helpers/useMatchMedia";
import logo from "../../assets/logo/Babble-Orange-S.png";
import logo2 from "../../assets/logo/Babble-Orange-L.png";
// import avatar from "../../assets/avatar.png";
import hamburger from "../../assets/hamburgericon.png";
import "./Header.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// import { collectionGroup } from "firebase/firestore";
// import { useState } from "react";

// interface User {
//   displayName: string;
//   email: string;
//   photoURL: string;
// }

const Header = () => {
  const isDesktop = useMatchMedia("(min-width: 569px)", true);
  const isPhone = useMatchMedia("(max-width: 568px)", true);

  function test() {
    checkCookie();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getCookie(dark_mode: any) {
    const name = dark_mode + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    const user = getCookie("darkmode");
    if (user != "") {
      console.log("succes check");
      //TODO Pagina moet worden veranderd naar ingelogte addonpagina
    } else {
      console.log("fail check");
      //TODO niet ingelogde addonpagina
    }
  }

  const google_provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithPopup(auth, google_provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        const cookie = "darkmode =" + JSON.stringify(user) + "; max-age=60;";
        document.cookie = cookie;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });

  return (
    <div className="menubalk">
      {isPhone && <img className="babble-logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="babble-logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="header-flex">
          <div>
            <button className="log-button" onClick={test}>
              Log in
            </button>
          </div>
          <div className="nav-menu">
            <img className="hamburger-menu" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          <div className="nav-avatar">
            <img className="nav-avatar-profile" src={logo} alt="profile" />
          </div>
          <div>
            <button className="log-button" onClick={signInWithGoogle}>
              Login
            </button>
            <span id="cookies" style={{ color: "white" }}></span>
          </div>
          <div className="nav-menu">
            <img
              className="hamburger-menu"
              alt="Babble"
              src={hamburger}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
