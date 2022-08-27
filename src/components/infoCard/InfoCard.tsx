import "./InfoCard.css";

const InfoCard = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("test")) {
    params.get("test");
    // for (const param of params) {
    //   console.log(param);
    // }
  }
  return (
    <div className="infoCard">
      <div className="infoCard__heading">Information</div>
      <div className="infoCard__body">
        <div className="infoCard__text">
          <div className="infoCard__item">
            <p className="infoCard__item__title">Functionality</p>
            <p className="infoCard__item__info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tempor massa consequat orci.
            </p>
          </div>
          <div className="infoCard__item">
            <p className="infoCard__item__title">Supported platforms</p>
            <p className="infoCard__item__info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="infoCard__item">
            <p className="infoCard__item__title">external services</p>
            <p className="infoCard__item__info">
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
