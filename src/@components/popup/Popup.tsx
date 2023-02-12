import React from "react";
import styles from "./popup.module.scss";

interface IPopup {
  title: string;
  message: string;
  close: Function;
  type: "message" | "error" | "dice";
  children: React.ReactElement | null;
}

const Popup: React.FC<IPopup> = ({ title, message, close, type, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__content}>
          <h3>{title}</h3>
          <div className={styles.wrapper__content__text}>
            <p>{message}</p>
            <div className={styles.wrapper__content__component}>{children}</div>
          </div>
        </div>
        {type !== "dice" && (
          <button
            onClick={() => {
              close();
            }}
          >
            &#9650;
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
