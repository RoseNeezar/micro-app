import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type mock = {
  id: number;
  app: string;
  data: string;
};

export interface globalState {
  boards: any[];
  globalState: mock | null;
}

const initialState: globalState = {
  boards: [],
  globalState: null,
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
  },
});

export const { fetchBoards, createBoard, addBoard, globalState } =
  globalSlice.actions;

export default globalSlice.reducer;
