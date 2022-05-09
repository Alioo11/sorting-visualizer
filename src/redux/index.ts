import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { algorithmTypes } from "../utils/types";

const initialState = {
  detailMood: false,
  compareMode: false,
  algorithmsDoc: false,
  firstAlgorithm: algorithmTypes.bubble_sort,
  secondAlgirithm: algorithmTypes.bubble_sort,
  barsCount: 30,
  animationDuration: 500,
  colapsePivot: 100,
  animationSpeedPivot: 200,
  animationSpeed: 850,
  //animationSpeed: 8500,
};

const counterSlice = createSlice({
  name: "App",
  initialState: initialState,
  reducers: {
    changeBarsCount: (state, { payload }) => {
      const barCount = parseInt(payload);
      state.barsCount = barCount;

      if (barCount > 100) {
        state.animationSpeed = 1;
      } else if (barCount > 50) {
        state.animationSpeed = 200 - parseInt(payload);
      } else {
        //state.animationSpeed = 10000;
        state.animationSpeed = 371;
      }
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
    toggleAlgorithmDoc: (state) => {
      state.algorithmsDoc = !state.algorithmsDoc;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export { store };
export const { toggleAlgorithmDoc, changeSpeed, toggleCompareMode, changeBarsCount, changeFirstAlgorithm, changeSecondAlgorithm } =
  counterSlice.actions;
