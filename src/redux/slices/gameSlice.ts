import { createSlice } from "@reduxjs/toolkit";
import { buildings } from "src/pages/game/types";
import { io } from "socket.io-client";

export interface GameState {
  socket: any | null;
  desiredBuilding: buildings | null;
}

const initialState: GameState = {
  socket: null,
  desiredBuilding: null,
};

export const gameState = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSocket: (state) => {
      state.socket = io("http://localhost:3001/", {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "http://localhost:3001/",
        },
      });
    },
    setDesiredBuilding: (state, action) => {
      state.desiredBuilding =
        state.desiredBuilding === action.payload
          ? null
          : (state.desiredBuilding = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket, setDesiredBuilding } = gameState.actions;

export default gameState.reducer;
