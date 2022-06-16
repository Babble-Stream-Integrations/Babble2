import "./InfoCard.css";

const InfoCard = () => {
  return (
    <div className="infoCard">
      <div className="heading">Information</div>
      <div className="infoBody">
        <div className="infoText">
          <div className="itemOne">
            <p className="title">Functionality</p>
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tempor massa consequat orci.
            </p>
          </div>
          <div className="itemTwo">
            <p className="title">Supported platforms</p>
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="itemThree">
            <p className="title">external services</p>
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tempor massa consequat orci.
            </p>
          </div>
        </div>
        <div className="addonPreview">
          <p>Preview</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
