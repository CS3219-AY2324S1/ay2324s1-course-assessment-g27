import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user";

export interface State {
  mode: PaletteMode,
  user: User,
  token: string | null,
  questions: [],
}

const initialState = {
  mode: "light",
  user: null,
  token: null,
  questions:[],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    }
    
  }
})

export const { setMode, setLogin, setLogout, setQuestions, setUser } = authSlice.actions;
export default authSlice.reducer;
