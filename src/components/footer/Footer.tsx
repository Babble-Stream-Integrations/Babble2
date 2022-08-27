import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">
        ©{new Date().getFullYear()} Babble stream integrations
      </p>
    </div>
  );
};

export default Footer;
