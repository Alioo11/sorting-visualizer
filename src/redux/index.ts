import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  detailMood: false,
  compareMode: false,
  algorithm: "merge", // insert from algirithm types
  barsCount: 30,
  animationDuration: 500,
  colapsePivot: 100,
  animationSpeedPivot: 200,
  animationSpeed: 850,
};

const counterSlice = createSlice({
  name: "App",
  initialState: initialState,
  reducers: {
    changeBarsCount: (state, { payload }) => {
      state.barsCount = parseInt(payload);
    },
    changeSpeed: (state, { payload }) => {
      state.animationSpeed = parseInt(payload);
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
