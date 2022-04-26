import "./AddonCard.css";

const addonCard = ({ card }) => {
  const titleWords = card.title.split(" ");
  const [hslSplit, ...restsplit] = card.color.split(", ");
  const colorChange = parseInt(restsplit[1]) + 15;
  const lightColor = hslSplit + ", " + restsplit[0] + ", " + colorChange + "%";

  return (
    <div
      className="addonCard"
      key={card.id}
      style={{
        background: `linear-gradient(to right, hsl(${lightColor}), hsl(${card.color})`,
      }}
    >
      <img src={card.icon} alt="placeholder" className="placeholder"></img>
      <p className="titleAddon">
        <b>{titleWords[0]}</b> {titleWords.splice(1).join(" ")}
      </p>
    </div>
  );
};

export default addonCard;
