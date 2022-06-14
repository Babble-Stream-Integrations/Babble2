import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AddonCards from "../../components/addonCards/AddonCards";
import "./AddonPage.css";
import { useEffect, useState } from "react";

const AddonPage = () => {
  const [showLoggedIn, setShowLoggedIn] = useState(false);

  useEffect(() => {
    checkCookie();
  });

  function checkCookie() {
    const user = getCookie("darkmode");
    if (user != "") {
      setShowLoggedIn(true);
    } else {
      setShowLoggedIn(false);
    }
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
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <h1 className="titlePage">Add-ons</h1>
        {showLoggedIn && (
          <div className="myAddon">
            <p className="subTitle">My Add-ons</p>
          </div>
        )}
        <div className="myAddon">
          <p className="subTitle">Toolkits</p>
        </div>
        <div className="midPage">
          <div>
            <p className="subTitle">Templates</p>
          </div>
          <div className="templateCards">
            <AddonCards />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddonPage;
