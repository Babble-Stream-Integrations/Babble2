import PropTypes from "prop-types";
import "./Button.css";

interface Three {
  text: string;
  onClick: any;
}

const Button = ({ text, onClick }: Three) => {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
