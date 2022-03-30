import { useMatchMedia } from "../../helpers/useMatchMedia";
import logo from "../../assets/logo/Babble-Small-Transparant.png";
import logo2 from "../../assets/logo/Babble-Big-Transparant.png";
import avatar from "../../assets/avatar.png";
import { HiMenuAlt4 } from "react-icons/hi";
import "./Header.css";

export const Header = () => {
  const isDesktop = useMatchMedia("(min-width: 969px)", true);
  const isPhone = useMatchMedia("(max-width: 968px)", true);

  return (
    <div className="container">
      {isPhone && <img className="logo" alt="Babble" src={logo} />}
      {isDesktop && <img className="logo" alt="Babble" src={logo2} />}
      {isPhone && (
        <div className="menu">
          <HiMenuAlt4 />
        </div>
      )}
      {isDesktop && (
        <div className="header-flex">
          <div className="avatar">
            <img className="profile" src={avatar} alt="profielfoto" />
          </div>
          <div className="button">
            <button>Log uit</button>
          </div>
          <div className="menu">
            <HiMenuAlt4 />
          </div>
        </div>
      )}
    </div>
  );
};
