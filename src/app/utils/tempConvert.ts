import { ETemprature } from "../../features/theme";

export const tempConvert = (
  temp: { value: number; unit: ETemprature },
  unit: ETemprature
) => {
  if (temp?.unit === unit) return temp?.value;
  if (temp?.unit === ETemprature.F)
    return (((temp?.value - 32) * 5) / 9).toFixed(1);
  if (temp?.unit === ETemprature.C)
    return ((temp?.value * 9) / 5 + 32).toFixed(1);
};
