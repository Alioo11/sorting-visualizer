import redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
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
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export { store };
export const { incremented, decremented } = counterSlice.actions;
