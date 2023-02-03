import React from "react";
import styles from "./playerLobbyCard.module.scss";

import Button from "src/@components/button/Button";

export interface IRoomCard {
  playerName: string;
  isMyName: boolean;
  isAdmin: boolean;
}

const PlayerLobbyCard: React.FC<IRoomCard> = ({
  playerName,
  isMyName,
  isAdmin,
}) => {
  const removePlayer = () => {};

  return (
    <div className={styles.box}>
      <div className={styles.box__wrapper}>
        <span>{playerName}</span>
        {!isMyName && isAdmin && (
          <Button text="remove" onClick={removePlayer} color="red" />
        )}
      </div>
    </div>
  );
};

export default PlayerLobbyCard;
