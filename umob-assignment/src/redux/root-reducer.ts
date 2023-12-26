import { combineReducers } from "@reduxjs/toolkit";
import { UsersReducer } from "./slices";
import { GameReducer } from "./slices/game.slice";

export const RootReducer = combineReducers({
  User: UsersReducer,
  Game: GameReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
