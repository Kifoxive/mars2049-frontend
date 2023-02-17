import React, { useState } from "react";
import styles from "./roomCard.module.scss";

import Button from "src/@components/button/Button";
import { setCurrentRoomName } from "src/redux/slices/roomsSlice";
import { useAppDispatch } from "src/redux/store";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import Popup from "../popup/Popup";
import { IPopup } from "src/pages/game/types";

export interface IRoomCard {
  roomName: string;
  roomCreator: string;
  roomPlayers: string[];
}

const RoomCard: React.FC<IRoomCard> = ({
  roomName,
  roomCreator,
  roomPlayers,
}) => {
  const { playerName } = useAppSelector((state) => state.rooms);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popup, setPopup] = useState<IPopup>({
    title: "",
    message: "",
    type: "message",
    component: null,
  });

  const onClickButton = async () => {
    if (!playerName) {
      setShowPopup(true);
      setPopup({
        title: "type player name",
        message: "",
        type: "error",
        component: null,
      });
      setTimeout(() => setShowPopup(false), 2000);
    } else if (roomPlayers.includes(playerName)) {
      setShowPopup(true);
      setPopup({
        title: "the player with this name is already in room",
        message: "",
        type: "error",
        component: null,
      });
      setTimeout(() => setShowPopup(false), 2000);
    } else {
      dispatch(setCurrentRoomName(roomName));
      navigate("/game");
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.box__wrapper}>
        {showPopup && (
          <Popup
            title={popup.title}
            message={popup.message}
            close={() => setShowPopup(false)}
            type={popup.type}
            children={popup.component}
          />
        )}
        <span>{roomName}</span>
        {/* <span>{roomCreator}</span> */}
        <Button text="play" onClick={onClickButton} color="green" />
      </div>
    </div>
  );
};

export default RoomCard;
