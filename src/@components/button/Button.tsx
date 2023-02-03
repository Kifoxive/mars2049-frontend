import React from "react";
import styles from "./button.module.scss";

interface IButton {
  text?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
  // imageUrl?: string;
}

const Button: React.FC<IButton> = ({ text, onClick, color }) => {
  return (
    <div className={styles.container}>
      <button className={styles[color]} onClick={onClick}>
        {text}
        {/* {<img src={imageUrl} />} */}
      </button>
    </div>
  );
};

export default Button;
