import React, { useEffect, useState } from "react";
import AddonCards from "../../components/addonCards/AddonCards";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import logoSmall from "../../assets/logo/Babble-Orange-S.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import "./AddonPage.css";

const AddonPage = () => {
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(logoSmall);
  const google_provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    checkCookie();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, google_provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;
          console.log(token);
        }
        const user = result.user;
        const cookie = "cookie =" + JSON.stringify(user) + "; max-age=30;";
        document.cookie = cookie;
        setShowLoggedIn(!showLoggedIn);
        checkCookie();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        setShowLoggedIn(false);
      });
  };

  function signOutWithGoogle() {
    signOut(auth)
      .then(() => {
        document.cookie = "darkmode=; Max-Age=0; path=/; domain=";
        setShowLoggedIn(false);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  function checkCookie() {
    const user = getCookie("cookie");
    if (user != "") {
      setShowLoggedIn(!showLoggedIn);
      if (user.includes("photoURL")) {
        const avatar = user.split(`","providerData"`);
        const photourl = avatar[0].split(`"photoURL":"`);
        setAvatar(photourl[1]);
      }
    } else {
      setShowLoggedIn(false);
    }
  }

  function getCookie(cookie: string) {
    const name = cookie + "=";
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

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header
          onSignIn={showLoggedIn ? signOutWithGoogle : signInWithGoogle}
          // onSignIn={(event: React.MouseEvent<HTMLButtonElement>) => {
          //   event.preventDefault();
          //   return showLoggedIn ? signOutWithGoogle : signInWithGoogle;
          // }}
          showSite={showLoggedIn}
          avatar={avatar}
        />
        <h1 className="titlePage">Add-ons</h1>
        <div className="midPage">
          <div>
            <p className="subTitle">Originals ⓘ</p>
          </div>
          <div className="templateCards">
            <AddonCards />
          </div>
          <div className="myAddon">
            <p className="subTitle">Toolkits ⓘ</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddonPage;
