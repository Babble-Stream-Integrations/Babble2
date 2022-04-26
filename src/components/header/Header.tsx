import { useMatchMedia } from "../../helpers/useMatchMedia";
import logo from "../../assets/logo/Babble-Small-Transparant.png";
import logo2 from "../../assets/logo/Babble-Big-Transparant.png";
import avatar from "../../assets/avatar.png";
import hamburger from "../../assets/hamburgericon.png";
import "./Header.css";

const Header = () => {
  const isDesktop = useMatchMedia("(min-width: 569px)", true);
  const isPhone = useMatchMedia("(max-width: 568px)", true);

  return (
    <div className="menubalk">
      {isPhone && <img className="babble-logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="babble-logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="header-flex">
          <div>
            <button className="log-button">Log in</button>
          </div>
          <div className="nav-menu">
            <img className="hamburger-menu" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          <div className="nav-avatar">
            <img className="nav-avatar-profile" src={avatar} alt="profile" />
          </div>
          <div>
            <button className="log-button">Log in</button>
          </div>
          <div className="nav-menu">
            <img className="hamburger-menu" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
