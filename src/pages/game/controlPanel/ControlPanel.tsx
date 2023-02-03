import React, { MouseEventHandler } from "react";
import styles from "./controlPanel.module.scss";

interface IButtonFinish {
  isActive: boolean;
  onTurnClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonFinish: React.FC<IButtonFinish> = ({ isActive, onTurnClick }) => {
  return (
    <div className={styles.finishButton}>
      <button
        className={`${styles.finishButton} ${
          isActive ? "" : styles.finishButton__disabled
        }`}
        disabled={!isActive}
        onClick={onTurnClick}
      >
        complete the move
      </button>
    </div>
  );
};

interface IControlPanel {
  color: "green" | "orange" | "pink" | "blue";
  playerName: string;
  isActive: boolean;
  onTurnClick: MouseEventHandler<HTMLButtonElement>;
  totalGameTurn: number;
}

const ControlPanel: React.FC<IControlPanel> = ({
  playerName,
  color,
  isActive,
  onTurnClick,
  totalGameTurn,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={`${styles.wrapper__player_name} ${styles[color]}`}>
          {playerName}
        </p>
        <div className={styles.wrapper__turn_side}>
          <span className={styles.counter}>{totalGameTurn}</span>
          <ButtonFinish isActive={isActive} onTurnClick={onTurnClick} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
