import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../../features/theme";
import { weathrReducer } from "../../features/weather";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    theme: themeReducer,
    weather: weathrReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});
