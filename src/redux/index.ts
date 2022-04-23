import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { algorithmTypes } from "../utils/types";

const initialState = {
  detailMood: false,
  compareMode: false,
  firstAlgorithm: algorithmTypes.bubble_sort,
  secondAlgirithm: algorithmTypes.bubble_sort,
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
    changeFirstAlgorithm: (state, { payload }) => {
      state.firstAlgorithm = payload;
    },
    changeSecondAlgorithm: (state, { payload }) => {
      state.secondAlgirithm = payload;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export { store };
export const { changeSpeed, toggleCompareMode, changeBarsCount, changeFirstAlgorithm, changeSecondAlgorithm } = counterSlice.actions;
