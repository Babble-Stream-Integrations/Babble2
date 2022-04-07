import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./AddonPage.css";

const AddonPage = () => {
  return (
    <div>
      <Header />
      <h1 className="titlePage">Add-ons</h1>
      <div className="myAddon">
        <p className="subTitle">My Add-ons</p>
      </div>
      <p className="subTitle">Templates</p>
      <Footer />
    </div>
  );
};

export default AddonPage;
