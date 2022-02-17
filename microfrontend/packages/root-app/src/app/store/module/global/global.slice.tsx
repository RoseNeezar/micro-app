import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "@store/store";
import { FC } from "react";
import { useSelector, Provider } from "react-redux";
type mock = {
  id: number;
  app: string;
  data: string;
};

export interface IGlobalState {
  boards: any[];
  globalState: mock | null;
  mobilityState: mock | null;
  xpState: mock | null;
}

const initialState: IGlobalState = {
  boards: [],
  globalState: null,
  mobilityState: null,
  xpState: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    fetchBoards: (state) => {},
    createBoard: (state, action: PayloadAction<{ title: string }>) => {},
    addBoard: (state, action: PayloadAction<any>) => {
      if (action.payload.boards.length > 0) {
        state.boards = action.payload.boards;
        return;
      }
      state.boards.push(action.payload.boards);
    },
    globalState: (
      state,
      action: PayloadAction<{ id: number; app: string; data: string }>
    ) => {},
    setMobilityState: (
      state,
      action: PayloadAction<{ id: number; app: string; data: string }>
    ) => {
      state.mobilityState = action.payload;
    },
    setXpState: (
      state,
      action: PayloadAction<{ id: number; app: string; data: string }>
    ) => {
      state.xpState = action.payload;
    },
  },
});

export const {
  fetchBoards,
  createBoard,
  addBoard,
  globalState,
  setMobilityState,
  setXpState,
} = globalSlice.actions;

export default globalSlice.reducer;
