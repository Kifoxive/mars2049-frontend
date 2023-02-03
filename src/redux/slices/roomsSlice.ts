import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateRoom, roomsApi } from "../../api/api";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const { data } = await roomsApi.getRooms();
  return data;
});
// export const createRoom = createAsyncThunk(
//   "rooms/createRoom",
//   async (obj: ICreateRoom) => {
//     const { data } = await roomsApi.createRoom(obj);
//     return data;
//   }
// );

export interface RoomsState {
  rooms: number[];
  currentRoomName: string;
  playerName: string;
}

const initialState: RoomsState = {
  rooms: [],
  currentRoomName: "",
  playerName: "",
};

export const roomsState = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setCurrentRoomName: (state, action) => {
      state.currentRoomName = action.payload;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentRoomName, setPlayerName } = roomsState.actions;

export default roomsState.reducer;
