import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  detailMood: false,
  compareMode: false,
  speed: 50,
  algorithm: "merge", // insert from algirithm types
  barsCount: 30,
  animationDuration: 500,
  colapsePivot: 100,
  animationSpeed: 500,
};

const counterSlice = createSlice({
  name: "App",
  initialState: initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
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
export const { incremented, decremented, changeSpeed, toggleCompareMode } = counterSlice.actions;
