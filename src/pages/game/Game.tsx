import React, { useEffect, useState } from "react";
import styles from "./game.module.scss";

import Board from "../../@components/board/Board";
import { useAppSelector } from "../../redux/store";
import { io, Socket } from "socket.io-client";
import { Navigate } from "react-router-dom";
import { Lobby } from "src/@components";
import ControlPanel from "./controlPanel/ControlPanel";
import CostsTable from "./costsTable/CostsTable";
import { buildings, IDiceSymbols, IUserData } from "./types";
import Inventory from "./inventory/Inventory";
import { Dice } from "./items/Items";
import { IGameData } from "src/pages/game/types";
import Popup from "../../@components/popup/Popup";
import { useAppDispatch } from "src/redux/store";
import { setSocket } from "src/redux/slices/gameSlice";

const Game = () => {
  const { currentRoomName, playerName } = useAppSelector(
    (state) => state.rooms
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [allowStartGame, setAllowStartGame] = useState<boolean>(false);
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [gameData, setGameData] = useState<IGameData>();
  const [privateGameState, setPrivateGameState] = useState<IUserData | null>();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popup, setPopup] = useState<{
    title: string;
    message: string;
    component: null | React.ReactElement;
  }>({
    title: "",
    message: "",
    component: null,
  });
  const [curTurnPlayer, setCurTurnPlayer] = useState<IUserData>();
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [diced, setDiced] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // const { desiredBuilding } = useAppSelector((state) => state.game);

  useEffect(() => {
    setSocket(
      io("http://localhost:3001/", {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "http://localhost:3001/",
        },
      })
    );
  }, []);

  // useEffect(() => {
  //   dispatch(setSocket());
  // }, []);

  // const { socket } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });

    joinRoom();
  }, [socket]);

  if (!currentRoomName) return <Navigate to="/rooms" />;
  if (!socket || !playerName || !currentRoomName) return <div>loading...</div>;

  const joinRoom = () => {
    socket.emit("join_room", { roomName: currentRoomName, playerName });
  };

  socket.on("set_creator", () => {
    setIsCreator(true);
  });

  socket.on("player_joined", (players: string[]) => {
    setPlayers(players);
  });

  socket.on("allow_start_game", () => {
    setAllowStartGame(true);
  });

  socket.on("get_private_data", (playerData: IUserData) => {
    setPrivateGameState(playerData);
  });

  socket.on("new_turn", (game: IGameData) => {
    // console.log(game);
    showWhoIsPlaying(game.currentTurnPlayer.username);
    // setIsStartGame(true);
    // setCurTurnPlayer(game.currentTurnPlayer);
    // setIsMyTurn(game.currentTurnPlayer.username === playerName);
    // showWhoIsPlaying(game.currentTurnPlayer.username);
  });

  socket.on("get_public_game_data", (game: IGameData) => {
    setIsStartGame(true);
    setCurTurnPlayer(game.currentTurnPlayer);
    setIsMyTurn(game.currentTurnPlayer.username === playerName);
    setGameData(game);
    socket.emit("get_private_data", { roomName: currentRoomName, playerName });
  });

  socket.on("send_private_game_data", (privateData: IGameData) => {
    setGameData(privateData);
  });

  const onTurnClick = () => {
    if (!isMyTurn) return;
    setDiced(false);
    socket.emit("make_turn", { roomName: currentRoomName, playerName });
  };

  const setDiceSymbol = (symbol: IDiceSymbols) => {
    socket.emit("set_dice_symbol", {
      roomName: currentRoomName,
      playerName,
      symbol,
    });
    setDiced(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const showWhoIsPlaying = (curPlayerUsername: string) => {
    if (curPlayerUsername === playerName) {
      setPopup({
        title: "Your turn!",
        message: "Shake the cube!",
        component: <Dice setDiceSymbol={setDiceSymbol} />,
      });
    } else {
      setPopup({
        title: "New turn",
        message: `${curPlayerUsername} is playing `,
        component: null,
      });
    }
    setShowPopup(true);
  };

  const addBuilding = (
    desiredBuilding: buildings,
    indexP: number,
    indexM: number
  ) => {
    socket.emit("add_building", {
      roomName: currentRoomName,
      playerName,
      desiredBuilding,
      indexP,
      indexM,
    });
  };

  socket.on(
    "server_message",
    ({ title, message }: { title: string; message: string }) => {
      console.log(title);

      setShowPopup(true);
      setPopup({
        title,
        message,
        component: null,
      });
      setTimeout(() => setShowPopup(false), 5000);
    }
  );

  return (
    <div className={styles.container}>
      {isStartGame && privateGameState && gameData ? (
        <div className={styles.game_area}>
          <div className={styles.game_area__control}>
            <ControlPanel
              playerName={playerName}
              color={privateGameState.color}
              isActive={isMyTurn && diced}
              onTurnClick={onTurnClick}
              totalGameTurn={gameData.totalGameTurn}
            />
          </div>
          <div className={styles.game_area__board}>
            <Board
              {...gameData}
              shift={privateGameState.shift}
              addBuilding={addBuilding}
            />
          </div>
          <div className={styles.game_area__costs}>
            <CostsTable
              buildingCosts={{
                air_station: { food: 2, mineral: 2 },
                food_station: { air: 2, mineral: 2 },
                mineral_station: { air: 2, food: 2 },
                base: { air: 3, food: 3, mineral: 3 },
                laboratory: { air: 4, mineral: 3 },
                peaceful_mission: { air: 3, food: 1 },
                agressive_mission: { air: 1, mineral: 3 },
                road: { road_cards: 3 },
                H2O_station: { air: 8, food: 8, mineral: 8 },
              }}
              color={privateGameState.color}
            />
          </div>
          <div className={styles.game_area__inventory}>
            <Inventory
              cards={privateGameState.cards}
              resource_tokens={privateGameState.resource_tokens}
              mission_cards={privateGameState.mission_cards}
              road_cards={privateGameState.road_cards}
            />
          </div>
          ;
        </div>
      ) : (
        <div className={styles.lobby}>
          <Lobby
            players={players}
            isCreator={isCreator}
            allowStartGame={allowStartGame}
            playerName={playerName}
            currentRoomName={currentRoomName}
            socket={socket}
          />
        </div>
      )}
      {showPopup && (
        <Popup
          title={popup.title}
          message={popup.message}
          close={() => setShowPopup(false)}
          children={popup.component}
        />
      )}
    </div>
  );
};

export default Game;
