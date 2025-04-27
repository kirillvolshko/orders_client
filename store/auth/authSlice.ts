"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user_id: string | null;
}

const initialState: AuthState = {
  user_id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },

    removeToken: (state) => {
      state.user_id = "";
      localStorage.removeItem("persist:root");
    },
  },
});
export const { removeToken, setUserId } = authSlice.actions;

export default authSlice.reducer;
