import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null,
  token: string | null,
  id: string | null,
}

const initialState: UserState = {
  username: null,
  email: null,
  token: null,
  id: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser (state) {
      state.username = null;
      state.email = null;
      state.token = null;
      state.id = null;

    }
  }
})

export const {setUser, removeUser} = userSlice.actions;
