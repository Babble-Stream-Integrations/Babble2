import { useMatchMedia } from "../../helpers/useMatchMedia";
import logo from "../../assets/logo/Babble-Orange-S.png";
import logo2 from "../../assets/logo/Babble-Orange-L.png";
import hamburger from "../../assets/hamburgericon.png";
import "./Header.css";
import Button from "../button/Button";

const Header = ({ onSignIn, showSite, avatar }: any) => {
  const isDesktop = useMatchMedia("(min-width: 569px)", true);
  const isPhone = useMatchMedia("(max-width: 568px)", true);

  return (
    <div className="menubalk">
      {isPhone && <img className="babble-logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="babble-logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="header-flex">
          <Button text={showSite ? "Log out" : "Login"} onClick={onSignIn} />
          <div className="nav-menu">
            <img className="hamburger-menu" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          {showSite && (
            <div className="nav-avatar">
              <img className="nav-avatar-profile" src={avatar} alt="profile" />
            </div>
          )}
          <Button text={showSite ? "Log out" : "Login"} onClick={onSignIn} />
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
