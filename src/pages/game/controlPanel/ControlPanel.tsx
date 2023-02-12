import React, { MouseEventHandler } from "react";
import styles from "./controlPanel.module.scss";

interface IButtonFinish {
  isActive: boolean;
  isWinner: boolean;
  onTurnClick: MouseEventHandler<HTMLButtonElement>;
  onWinClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonFinish: React.FC<IButtonFinish> = ({
  isActive,
  isWinner,
  onTurnClick,
  onWinClick,
}) => {
  return (
    <div className={styles.finishButton_container}>
      {isWinner ? (
        <button
          className={`${styles.finishButton}  
        ${styles.winnerButton}`}
          disabled={!isActive}
          onClick={onWinClick}
        >
          finish the game
        </button>
      ) : (
        <button
          className={`${styles.finishButton} ${
            isActive ? "" : styles.finishButton__disabled
          }`}
          disabled={!isActive}
          onClick={onTurnClick}
        >
          complete the move
        </button>
      )}
    </div>
  );
};

interface IControlPanel {
  color: "green" | "orange" | "pink" | "blue";
  playerName: string;
  totalGameTurn: number;
  isActive: boolean;
  isWinner: boolean;
  onTurnClick: MouseEventHandler<HTMLButtonElement>;
  onWinClick: MouseEventHandler<HTMLButtonElement>;
}

const ControlPanel: React.FC<IControlPanel> = ({
  color,
  playerName,
  totalGameTurn,
  isActive,
  isWinner,
  onTurnClick,
  onWinClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={`${styles.wrapper__player_name} ${styles[color]}`}>
          {playerName}
        </p>
        <div className={styles.wrapper__turn_side}>
          <span className={styles.counter}>{totalGameTurn}</span>
          <ButtonFinish
            isActive={isActive}
            isWinner={isWinner}
            onTurnClick={onTurnClick}
            onWinClick={onWinClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
