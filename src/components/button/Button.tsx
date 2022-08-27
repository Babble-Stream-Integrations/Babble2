import "./Button.css";

interface Three {
  text: string;
  clickOn: () => void;
}

const Button = ({ text, clickOn }: Three) => {
  return (
    <button onClick={clickOn} className="button">
      {text}
    </button>
  );
};

export default Button;
