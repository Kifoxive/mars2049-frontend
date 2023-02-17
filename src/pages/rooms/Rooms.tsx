import React from "react";
import styles from "./rooms.module.scss";

import { useNavigate } from "react-router-dom";
import { IRoomCard } from "src/@components/roomCard/RoomCard";
import { RoomCard, Button, Input } from "src/@components";
import { reload } from "src/assets";
import { fetchRooms, setPlayerName } from "src/redux/slices/roomsSlice";
import { useAppDispatch } from "src/redux/store";

const Rooms: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rooms, setRooms] = React.useState<IRoomCard[]>();
  const [inputPlayerName, setInputPlayerName] = React.useState<string>("");

  const onFetchClick = async () => {
    const { payload } = await dispatch(fetchRooms());
    setRooms(payload.rooms);
  };

  return (
    <div className={styles.container}>
      {/* <button
        className={`${socketConnected ? styles.red : styles.green}`}
        onClick={handleSocketConnection}
      >
        {socketConnected ? "disconnect" : "connect"}
      </button> */}
      <div className={styles.wrapper}>
        <div className={styles.buttons_panel}>
          <Button
            text="Create room"
            onClick={() => navigate(`/create-room/`)}
            color="yellow"
          />
          <button className={styles.reload_btn} onClick={() => onFetchClick()}>
            <img src={reload} alt="reload" />
          </button>
          <Input
            value={inputPlayerName}
            placeholder="username"
            onChangeInput={(value: string) => {
              setInputPlayerName(value);
              dispatch(setPlayerName(value));
            }}
          />
        </div>
        <div className={styles.wrapper__rooms_box}>
          {rooms?.map((item, index) => (
            <RoomCard
              key={index}
              roomName={item.roomName}
              roomCreator={item.roomCreator}
              roomPlayers={item.roomPlayers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
