import React from "react";
import styles from "./lobby.module.scss";

import { PlayerLobbyCard, Button } from "src/@components";
import { profile } from "src/assets";
interface ILobby {
  players: string[];
  isCreator: boolean;
  allowStartGame: boolean;
  playerName: string;
  currentRoomName: string;
  socket: any;
}

const Lobby: React.FC<ILobby> = ({
  players,
  isCreator,
  allowStartGame,
  playerName,
  currentRoomName,
  socket,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>{currentRoomName}</h2>

        <div className={styles.players_box}>
          {players.map((player: string, index: number) => (
            <PlayerLobbyCard
              key={index}
              playerName={player}
              isMyName={playerName === player}
              isAdmin={isCreator}
            />
          ))}
        </div>
        <div className={styles.buttons_panel}>
          <p
            className={`${styles.players_counter} ${
              players.length < 2 ? styles.red : styles.green
            }`}
          >
            {players.length} / 4{" "}
            <img
              src={profile}
              alt="players"
              className={styles.players_counter__profile_icon}
            />
          </p>
          {isCreator && allowStartGame && (
            <Button
              text="start game"
              onClick={() => {
                socket.emit("start_game", {
                  playerName,
                  roomName: currentRoomName,
                });
              }}
              color="green"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
