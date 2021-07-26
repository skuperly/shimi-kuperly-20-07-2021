import { RootState } from "./types";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const partialState = {
      theme: state.theme,
      weather: { favorites: state.weather.favorites },
    };
    const serializedState = JSON.stringify(partialState);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};
