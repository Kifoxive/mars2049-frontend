import React from "react";
import styles from "./lobby.module.scss";

import { PlayerLobbyCard, Button } from "src/@components";
import { profile } from "src/assets";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  socket.on("remove_player", () => {
    navigate("/rooms");
  });

  const removePlayer = (removePlayerName: string) => {
    socket.emit("remove_player", {
      roomName: currentRoomName,
      playerName,
      removePlayerName,
    });
  };

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
              removePlayer={removePlayer}
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
