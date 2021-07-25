import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { ThemeState, ETemprature } from "./types";

const initialState: ThemeState = {
  darkMode: false,
  tempUnit: ETemprature.C,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setTempUnit: (state, action: PayloadAction<ETemprature>) => {
      state.tempUnit = action.payload;
    },
  },
});

export const { toggleDarkMode, setTempUnit } = themeSlice.actions;
export const selectDarkMode = (state: RootState) => state.theme.darkMode;
export const selectTempUnit = (state: RootState) => state.theme.tempUnit;
export const toggleTempUnit = (): AppThunk => (dispatch, getState) => {
  const tempUnit = selectTempUnit(getState());
  tempUnit === ETemprature.C
    ? dispatch(setTempUnit(ETemprature.F))
    : dispatch(setTempUnit(ETemprature.C));
};

export const themeReducer = themeSlice.reducer;
