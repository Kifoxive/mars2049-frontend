import axios from "axios";

export const API_URL = "http://localhost:3001";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const roomsApi = {
  getRooms() {
    return instance.get("/rooms");
  },
  createRoom({ roomName, userName }: ICreateRoom) {
    return instance.post("/rooms", { roomName, userName });
  },
};

export interface ICreateRoom {
  roomName: string;
  userName: string;
}
