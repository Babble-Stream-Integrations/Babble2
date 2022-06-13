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
import { useEffect, useState } from "react";

const Header = () => {
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(logo);
  const isDesktop = useMatchMedia("(min-width: 569px)", true);
  const isPhone = useMatchMedia("(max-width: 568px)", true);
  const google_provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    checkCookie();
    // console.log(showLoggedIn);
  });

  function checkCookie() {
    const user = getCookie("darkmode");
    if (user != "") {
      setShowLoggedIn(true);
      if (user.includes("photoURL")) {
        const avatar = user.split(`","providerData"`);
        const photourl = avatar[0].split(`"photoURL":"`);
        setAvatar(photourl[1]);
      }
    } else {
      setShowLoggedIn(false);
    }
  }

  function signOutWithGoogle() {
    signOut(auth)
      .then(() => {
        document.cookie = "darkmode=; Max-Age=0; path=/; domain=";
        setShowLoggedIn(false);
        // Sign-out successful.
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.log(error);
        // An error happened.
      });
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
        // console.log(user);
        const cookie = "darkmode =" + JSON.stringify(user) + "; max-age=30;";
        document.cookie = cookie;
        setShowLoggedIn(true);
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
        setShowLoggedIn(false);
        // ...
      });
  };

  return (
    <div className="menubalk">
      {isPhone && <img className="babble-logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="babble-logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="header-flex">
          {showLoggedIn && (
            <div>
              <button className="log-button" onClick={signOutWithGoogle}>
                Logout
              </button>
            </div>
          )}
          {!showLoggedIn && (
            <div>
              <button className="log-button" onClick={signInWithGoogle}>
                Login
              </button>
            </div>
          )}
          <div className="nav-menu">
            <img className="hamburger-menu" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          {showLoggedIn && (
            <div className="header-flex">
              <div className="nav-avatar">
                <img
                  className="nav-avatar-profile"
                  src={avatar}
                  alt="profile"
                />
              </div>
              <div>
                <button className="log-button" onClick={signOutWithGoogle}>
                  Logout
                </button>
              </div>
            </div>
          )}
          {!showLoggedIn && (
            <div>
              <button className="log-button" onClick={signInWithGoogle}>
                Login
              </button>
            </div>
          )}
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
