import { AiOutlineCopyright } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <AiOutlineCopyright />
      <p>{new Date().getFullYear()} Babble stream integrations</p>
    </div>
  );
};

export default Footer;
