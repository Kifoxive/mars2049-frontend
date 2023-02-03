import { configureStore } from "@reduxjs/toolkit";
import roomsSlice from "./slices/roomsSlice";
import gameSlice from "./slices/gameSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { rooms: roomsSlice, game: gameSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
