import React, { useEffect, useState } from "react";
import styles from "./game.module.scss";

import Board from "../../@components/board/Board";
import { useAppSelector } from "../../redux/store";
import { io, Socket } from "socket.io-client";
import { Navigate, useNavigate } from "react-router-dom";
import { Lobby } from "src/@components";
import ControlPanel from "./controlPanel/ControlPanel";
import {
  buildings,
  IChoosingPopup,
  IDiceSymbols,
  IPlayerColor,
  IPopup,
  ISendAction,
  IUserData,
} from "./types";
import Inventory from "./inventory/Inventory";
import { Dice } from "./items/Items";
import { IGameData } from "src/pages/game/types";
import Popup from "../../@components/popup/Popup";
import InfoTables from "./infoTables/InfoTables";
import FinalPopup from "src/@components/finalPopup/FinalPopup";
import ChoosingPopup from "src/@components/choosingPopup/ChoosingPopup";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/";
console.log(process.env.REACT_APP_SERVER_URL);

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
  const [popup, setPopup] = useState<IPopup>({
    title: "",
    message: "",
    type: "message",
    component: null,
  });
  const [curTurnPlayer, setCurTurnPlayer] = useState<IUserData>();
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [diced, setDiced] = useState<boolean>(false);
  const [wantToShowPopup, setWantToShowPopup] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [winnerData, setWinnerData] = useState<{
    username: string;
    color: IPlayerColor;
  } | null>(null);

  const [choosingPopup, setChoosingPopup] = useState<IChoosingPopup>({
    type: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setSocket(
      io(API_URL, {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": API_URL,
        },
      })
    );
  }, []);

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

  socket.on("allow_start_game", (value: boolean) => {
    setAllowStartGame(value);
  });

  socket.on("get_private_data", (playerData: IUserData) => {
    setPrivateGameState(playerData);
  });

  socket.on("new_turn", (username: string) => {
    showWhoIsPlaying(username);
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

  socket.on("confirm_win", (gameData: IGameData) => {
    if (gameData.winner.username === playerName) {
      setIsWinner(true);
    }
    setGameData(gameData);
  });

  socket.on("server_message", (message: IPopup) => {
    displayToPopup(message);
  });

  socket.on(
    "finish",
    ({ username, color }: { username: string; color: IPlayerColor }) => {
      setIsGameFinished(true);
      setWinnerData({ username, color });
      setGameData(gameData);
    }
  );

  socket.on("remove_room", () => {
    socket.disconnect();
    navigate("/rooms");
  });

  socket.on("allow_action", (type: "discovery" | "robbery") => {
    setChoosingPopup({ type });
  });

  const onWinClick = () => {
    if (isWinner)
      socket.emit("submit_win", { roomName: currentRoomName, playerName });
  };

  const onTurnClick = () => {
    if (!isMyTurn) return;
    setDiced(false);
    socket.emit("make_turn", { roomName: currentRoomName, playerName });
  };

  const showWhoIsPlaying = (curPlayerUsername: string) => {
    if (curPlayerUsername === playerName) {
      // setDiced(false);
      displayToPopup({
        title: "Your turn!",
        message: "Shake the cube!",
        type: "dice",
        component: <Dice setDiceSymbol={setDiceSymbol} />,
      });
    } else {
      displayToPopup({
        title: "New turn",
        message: `${curPlayerUsername} is playing `,
        type: "message",
        component: null,
      });
    }
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

  const displayToPopup = ({
    title,
    message,
    component = null,
    type,
  }: IPopup) => {
    setPopup({
      title,
      message,
      type,
      component,
    });
    setShowPopup(true);

    if (type === "dice") {
      setWantToShowPopup(true);
      return;
    }
    setWantToShowPopup(false);
  };

  const tryToClose = () => {
    if (wantToShowPopup) return setShowPopup(true);
    setShowPopup(false);
  };

  const setDiceSymbol = (symbol: IDiceSymbols) => {
    console.log(symbol);

    setTimeout(() => {
      socket.emit("set_dice_symbol", {
        roomName: currentRoomName,
        playerName,
        symbol,
      });
      // setShowPopup(true);
      // setWantToShowPopup(false);
      // tryToClose();
      setShowPopup(false);

      if (symbol === "discovery" || symbol === "robbery") {
        setChoosingPopup({ type: symbol });
      } else setDiced(true);
    }, 1000);
  };

  const buyToken = (
    resource: "air" | "food" | "mineral",
    to: "three" | "eight"
  ) => {
    socket.emit("buy_token", {
      roomName: currentRoomName,
      playerName,
      resource,
      to,
    });
  };

  const sellToken = (
    resource: "air" | "food" | "mineral",
    from: "three" | "eight"
  ) => {
    socket.emit("sell_token", {
      roomName: currentRoomName,
      playerName,
      resource,
      from,
    });
  };

  const tradeCards = (
    from: "air" | "food" | "mineral",
    to: "air" | "food" | "mineral"
  ) => {
    socket.emit("trade_cards", {
      roomName: currentRoomName,
      playerName,
      from,
      to,
    });
  };

  const submitAction = (action: ISendAction) => {
    tryToClose();
    setDiced(true);
    socket.emit("action", { roomName: currentRoomName, playerName, action });
  };

  return (
    <div className={styles.container}>
      {isStartGame && privateGameState && gameData ? (
        <div className={styles.game_area}>
          <div className={styles.game_area__control}>
            <ControlPanel
              color={privateGameState.color}
              playerName={playerName}
              totalGameTurn={gameData.totalGameTurn}
              isActive={isMyTurn && diced}
              isWinner={isWinner}
              onTurnClick={onTurnClick}
              onWinClick={onWinClick}
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
            <InfoTables
              color={privateGameState.color}
              buyToken={buyToken}
              sellToken={sellToken}
              tradeCards={tradeCards}
              isActive={isMyTurn && diced}
              exchangeRate={privateGameState.laboratories.rate}
            />
          </div>
          <div className={styles.game_area__inventory}>
            <Inventory
              color={privateGameState.color}
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
          type={popup.type}
          children={popup.component}
        />
      )}
      {isGameFinished && winnerData && gameData && (
        <FinalPopup
          isWinner={isWinner}
          winnerData={winnerData}
          totalTurn={gameData.totalGameTurn}
        />
      )}
      {choosingPopup.type && gameData && (
        <ChoosingPopup
          type={choosingPopup.type}
          submitAction={submitAction}
          playerName={playerName}
          gameData={gameData}
        />
      )}
    </div>
  );
};

export default Game;
