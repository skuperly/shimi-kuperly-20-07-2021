import { ICity } from "../../../app/types";
import { ETemprature } from "../../theme";

export interface IDaylyWeather {
  date?: string;
  name?: string;
  key?: string;
  weatherIcon: number;
  temperature: {
    min?: { value: number; unit: ETemprature };
    max: { value: number; unit: ETemprature };
  };
}
export interface ICurrentWeather {
  weatherText: string;
  weatherIcon: number;
  temperature: { value: number; unit: ETemprature };
}

export interface IFavorite {
  ID: string;
  name: string;
  currentWeather: ICurrentWeather;
}

export interface IWeatherState {
  loading: boolean;
  error: string;
  currentCity: ICity;
  currentWeather?: ICurrentWeather;
  currentForecasts?: {
    weatherText: string;
    daysWeather: IDaylyWeather[];
  };
  favorites: IFavorite[];
}

export interface IWeatherAction {
  current: ICurrentWeather;
  forecasts: {
    weatherText: string;
    daysWeather: IDaylyWeather[];
  };
}
