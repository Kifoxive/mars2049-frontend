import React from "react";
import styles from "./input.module.scss";

interface IInput {
  placeholder: string;
  value: string;
  onChangeInput: Function;
}

const Input: React.FC<IInput> = ({ placeholder, value, onChangeInput }) => {
  return (
    <div className={styles.box}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeInput(e.target.value)}
      />
    </div>
  );
};

export default Input;
