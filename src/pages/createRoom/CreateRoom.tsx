import React from "react";
import styles from "./createRoom.module.scss";

import { Button } from "src/@components";
import { useNavigate } from "react-router-dom";
import { Input } from "src/@components";
import { useAppDispatch } from "src/redux/store";
import { setPlayerName, setCurrentRoomName } from "src/redux/slices/roomsSlice";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [creatorName, setCreatorName] = React.useState<string>("");
  const [roomName, setRoomName] = React.useState<string>("");

  const onClickButton = async () => {
    try {
      dispatch(setPlayerName(creatorName));
      dispatch(setCurrentRoomName(roomName));
      navigate("/game");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.back_btn}>
          <Button
            text="← rooms"
            onClick={() => navigate("/rooms")}
            color="yellow"
          />
        </div>
        <div className="inputs">
          <Input
            placeholder="username"
            value={creatorName}
            onChangeInput={(value: string) => setCreatorName(value)}
          />
          <Input
            placeholder="room name"
            value={roomName}
            onChangeInput={(value: string) => setRoomName(value)}
          />
          <br />
          <Button text="create room" onClick={onClickButton} color="green" />
          <br />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
