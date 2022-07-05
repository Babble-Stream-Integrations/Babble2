import "./Button.css";

interface Three {
  text: string;
  // clickOn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  clickOn: () => void;
}

const Button = ({ text, clickOn }: Three) => {
  return (
    <button onClick={clickOn} className="btn">
      {text}
    </button>
  );
};

export default Button;
