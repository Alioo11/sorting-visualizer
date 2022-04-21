import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  detailMood: false,
  compareMode: false,
  speed: 50,
  algorithm: "merge", // insert from algirithm types
  barsCount: 30,
  animationDuration: 500,
  colapsePivot: 100,
  animationSpeed: 50,
};

const counterSlice = createSlice({
  name: "App",
  initialState: initialState,
  reducers: {
    changeBarsCount: (state, { payload }) => {
      state.barsCount = parseInt(payload);
    },
    changeSpeed: (state, { payload }) => {
      state.speed = parseInt(payload);
    },
    toggleCompareMode: (state) => {
      state.compareMode = !state.compareMode;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export { store };
export const { changeSpeed, toggleCompareMode, changeBarsCount } = counterSlice.actions;
