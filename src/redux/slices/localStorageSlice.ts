import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGames } from "../../types/IGames";

interface LocalState {
  users: {
    [key: string]: IGames[]
  }
}

interface IPayload {
  email: string;
  game: IGames;
}

const initialState: LocalState = {
  users: {}
}

export const localStorageSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    addGame (state, action: PayloadAction<IPayload>) {
      action.payload.email && state.users[action.payload.email] 
        ? state.users[action.payload.email] = [...state.users[action.payload.email].filter(item => item.id !== action.payload.game.id), action.payload.game]
        : state.users[action.payload.email] = [action.payload.game]
    },
    removeGame (state, action: PayloadAction<IPayload>) {
      state.users[action.payload.email] = state.users[action.payload.email].filter(item => item.id !== action.payload.game.id)
    }
  },
})

export const {addGame, removeGame} = localStorageSlice.actions;