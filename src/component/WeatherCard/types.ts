import { ICity } from "../../app/types";
import { IDaylyWeather } from "../../features/weather";

export interface IWeatherCardProps {
  weather: IDaylyWeather;
  onClick?: (city: ICity) => void;
  delay?: number;
}
