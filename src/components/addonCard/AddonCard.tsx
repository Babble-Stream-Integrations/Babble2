import "./AddonCard.css";
import { IAddonData } from "../addonCards/AddonCards";
import { Link, useLocation } from "react-router-dom";

const addonCard = ({ card }: { card: IAddonData }) => {
  const titleWords = card.title.split(" ");
  const [hslSplit, ...restsplit] = card.color.split(", ");
  const colorChange = parseInt(restsplit[1]) + 15;
  const lightColor = hslSplit + ", " + restsplit[0] + ", " + colorChange + "%";
  const cardTitle = titleWords.join("_");
  const restTitle = titleWords.splice(1).join(" ");
  // console.log(typeof card);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  // console.log(location);

  return (
    // <Link to={`/${linkName}`} target="_blank">
    <Link
      to={{
        pathname: `/addons/${cardTitle}`,
        search: `cardinfo=${JSON.stringify({ ...card })}`,
        // state: "Hello World!",
      }}
      target="_blank"
    >
      <div
        key={card.order}
        className="addonCard"
        style={{
          background: `linear-gradient(to right, hsl(${lightColor}), hsl(${card.color})`,
        }}
      >
        <img
          src={card.icon}
          alt="placeholder"
          className="addonCard__placeholder"
        ></img>
        <p className="addonCard__title">
          <b>{titleWords[0]}</b> {restTitle}
        </p>
      </div>
      {/* </Route> */}
    </Link>
  );
};

export default addonCard;
