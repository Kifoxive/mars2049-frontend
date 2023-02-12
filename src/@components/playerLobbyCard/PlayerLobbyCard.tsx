import React from "react";
import styles from "./playerLobbyCard.module.scss";

import Button from "src/@components/button/Button";

export interface IRoomCard {
  playerName: string;
  isMyName: boolean;
  isAdmin: boolean;
  removePlayer: Function;
}

const PlayerLobbyCard: React.FC<IRoomCard> = ({
  playerName,
  isMyName,
  isAdmin,
  removePlayer,
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.box__wrapper}>
        <span>{playerName}</span>
        {!isMyName && isAdmin && (
          <Button
            text="remove"
            onClick={() => removePlayer(playerName)}
            color="red"
          />
        )}
      </div>
    </div>
  );
};

export default PlayerLobbyCard;
