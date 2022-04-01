import { useMatchMedia } from "../../helpers/useMatchMedia";
import logo from "../../assets/logo/Babble-Small-Transparant.png";
import logo2 from "../../assets/logo/Babble-Big-Transparant.png";
import avatar from "../../assets/avatar.png";
import hamburger from "../../assets/hamburgericon.png";
import "./Header.css";

export const Header = () => {
  const isDesktop = useMatchMedia("(min-width: 500px)", true);
  const isPhone = useMatchMedia("(max-width: 499px)", true);

  return (
    <div className="menubalk">
      {isPhone && <img className="logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="menu">
          <img className="logo" alt="Babble" src={hamburger} />
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          <div className="avatar">
            <img className="profile" src={avatar} alt="profile" />
          </div>
          <div className="button">
            <button>Log out</button>
          </div>
          <div className="menu">
            <img className="hamburger" alt="Babble" src={hamburger} />
          </div>
        </div>
      )}
    </div>
  );
};
