import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface InitialState {
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

// exporting actions
export const {setIsAuthenticated} = authSlice.actions;

// exporting selectors
export const selectIsAuthenticated = (state:RootState) => state.authSlice.isAuthenticated;

