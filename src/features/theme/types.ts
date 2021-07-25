export enum ETemprature {
  F = "F",
  C = "C",
}

export interface ThemeState {
  darkMode: boolean;
  tempUnit: ETemprature;
}
