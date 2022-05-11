import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AddonCards from "../../components/addonCards/AddonCards";
import "./AddonPage.css";

const AddonPage = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <h1 className="titlePage">Add-ons</h1>
        <div className="myAddon">
          <p className="subTitle">My Add-ons</p>
        </div>
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
