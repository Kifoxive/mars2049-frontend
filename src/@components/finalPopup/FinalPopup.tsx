import React from "react";
import { Link } from "react-router-dom";
import { trophy } from "src/assets";
import { IPlayerColor } from "src/pages/game/types";
import styles from "./finalPopup.module.scss";

interface IFinalPopup {
  isWinner: boolean;
  winnerData: { username: string; color: IPlayerColor };
  totalTurn: number;
}

const FinalPopup: React.FC<IFinalPopup> = ({
  isWinner,
  winnerData,
  totalTurn,
}) => {
  return (
    <>
      {isWinner ? (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={`${styles.title} ${styles[winnerData.color]}`}>
              <h3>Congratulations, you win</h3>
              <img src={trophy} alt="trophy" />
            </div>
            <div className={styles.text}>
              <p>Here is a winner!</p>
              <p>You won in {totalTurn} turns :-)</p>
            </div>
            <Link className={styles.end_btn} to="/rooms">
              end game
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={`${styles.title} ${styles[winnerData.color]}`}>
              <h3>
                {winnerData?.color.charAt(0).toUpperCase() +
                  winnerData?.color.slice(1)}{" "}
                win
                <img src={trophy} alt="trophy" />
              </h3>
            </div>
            <div className={styles.text}>
              <p>Congratulations to {winnerData?.username}!</p>
              <p>Better luck next time :-)</p>
            </div>
            <Link className={styles.end_btn} to="/rooms">
              end game
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalPopup;
