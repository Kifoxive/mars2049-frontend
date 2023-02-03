import React from "react";
import styles from "./roomCard.module.scss";

import Button from "src/@components/button/Button";
import { setCurrentRoomName } from "src/redux/slices/roomsSlice";
import { useAppDispatch } from "src/redux/store";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export interface IRoomCard {
  roomName: string;
  roomCreator: string;
}

const RoomCard: React.FC<IRoomCard> = ({ roomName, roomCreator }) => {
  const { playerName } = useAppSelector((state) => state.rooms);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickButton = async () => {
    if (!playerName) {
      console.log("type player name");
      return;
    }
    dispatch(setCurrentRoomName(roomName));
    navigate("/game");
  };

  return (
    <div className={styles.box}>
      <div className={styles.box__wrapper}>
        <span>{roomName}</span>
        <Button text="play" onClick={onClickButton} color="green" />
      </div>
    </div>
  );
};

export default RoomCard;
