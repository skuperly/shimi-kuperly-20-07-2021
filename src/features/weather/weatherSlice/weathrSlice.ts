import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentWeather,
  getForecasts,
  getGeoLoacation,
} from "../../../app/service";
import { AppThunk, RootState } from "../../../app/store";
import { ICity } from "../../../app/types";
import {
  ICurrentWeather,
  IDaylyWeather,
  IFavorite,
  IWeatherState,
  IWeatherAction,
} from "./types";

const initialState: IWeatherState = {
  loading: false,
  error: "",
  currentCity: { name: "Tel Aviv", key: "215854" },
  favorites: [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentCity: (state, action: PayloadAction<ICity>) => {
      state.currentCity = action.payload;
    },
    setCurrentWeather: (state, action: PayloadAction<IWeatherAction>) => {
      state.currentWeather = action.payload.current;
      state.currentForecasts = action.payload.forecasts;
    },

    setFavoriets: (state, action: PayloadAction<IFavorite[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const {
  setError,
  setLoading,
  setCurrentCity,
  setCurrentWeather,
  setFavoriets,
} = weatherSlice.actions;

export const selectCurentForecasts = (state: RootState) =>
  state.weather.currentForecasts;

export const selectFavorites = (state: RootState) => state.weather.favorites;

export const selectCurentCity = (state: RootState) => state.weather.currentCity;

export const selectLoading = (state: RootState) => state.weather.loading;

export const selectError = (state: RootState) => state.weather.error;

export const selectCurentWeather = (state: RootState) =>
  state.weather.currentWeather;

export const setSelectedCity =
  (city: ICity): AppThunk =>
  (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setCurrentCity(city));

    Promise.all([
      // http.get("assets/stubs/current-weather.json"),
      getCurrentWeather(city.key),
      // http.get("assets/stubs/days.json"),
      getForecasts(city.key),
    ])
      .then(([currentWetherRes, forecastsRes]) => {
        const currentWeatherRes = currentWetherRes.data[0];
        const current: ICurrentWeather = {
          weatherText: currentWeatherRes.WeatherText,
          weatherIcon: currentWeatherRes.WeatherIcon,
          temperature: {
            value: currentWeatherRes.Temperature.Metric.Value,
            unit: currentWeatherRes.Temperature.Metric.Unit,
          },
        };

        const currentForecastsRes = forecastsRes.data;
        const currentForecasts: IDaylyWeather[] = [];
        currentForecastsRes.DailyForecasts.forEach((day: any) => {
          currentForecasts.push({
            date: day.Date,
            weatherIcon: day.Day.Icon,
            temperature: {
              min: {
                value: day.Temperature.Minimum.Value,
                unit: day.Temperature.Minimum.Unit,
              },
              max: {
                value: day.Temperature.Maximum.Value,
                unit: day.Temperature.Maximum.Unit,
              },
            },
          });
        });

        dispatch(
          setCurrentWeather({
            current,
            forecasts: {
              weatherText: currentForecastsRes.Headline.Text,
              daysWeather: currentForecasts,
            },
          })
        );
      })
      .catch((err) => {
        dispatch(setError(err.message));
      })
      .finally(() => dispatch(setLoading(false)));
  };

export const toggleFavorite =
  (currentCity: ICity, isFavorite: boolean): AppThunk =>
  (dispatch, getState) => {
    const currentWeather = selectCurentWeather(getState());
    const favorites = selectFavorites(getState());
    if (isFavorite) {
      const newFavorites = favorites.filter(
        (item) => item.ID !== currentCity.key
      );
      dispatch(setFavoriets(newFavorites));
    } else {
      dispatch(
        setFavoriets([
          ...favorites,
          {
            ID: currentCity.key,
            name: currentCity.name,
            currentWeather: currentWeather!,
          },
        ])
      );
    }
  };

export const updateFavorites = (): AppThunk => async (dispatch, getState) => {
  const favorites = selectFavorites(getState());
  if (!favorites.length) return;
  const updatedFavorites: IFavorite[] = [];
  dispatch(setLoading(true));
  try {
    for (let i = 0; i < favorites.length; i++) {
      // const res = await http.get("assets/stubs/current-weather.json");
      const res = await getCurrentWeather(favorites[i].ID);
      const currentWeatherRes = res.data[0];
      const currentWeather: ICurrentWeather = {
        weatherText: currentWeatherRes.WeatherText,
        weatherIcon: currentWeatherRes.WeatherIcon,
        temperature: {
          value: currentWeatherRes.Temperature.Metric.Value,
          unit: currentWeatherRes.Temperature.Metric.Unit,
        },
      };
      updatedFavorites.push({ ...favorites[i], currentWeather });
    }
    dispatch(setFavoriets(updatedFavorites));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setDefaultLocation = (): AppThunk => (dispatch, getState) => {
  if ("geolocation" in navigator) {
    const successCb = (position: GeolocationPosition) => {
      getGeoLoacation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
        .then((res) => {
          dispatch(
            setSelectedCity({ name: res.data.LocalizedName, key: res.data.Key })
          );
        })
        .catch((err) =>
          dispatch(setSelectedCity({ name: "Tel Aviv", key: "215854" }))
        );
    };

    const errorCb = (err: GeolocationPositionError) => {
      dispatch(setSelectedCity({ name: "Tel Aviv", key: "215854" }));
    };
    navigator.geolocation.getCurrentPosition(successCb, errorCb);
  } else {
    dispatch(setSelectedCity({ name: "Tel Aviv", key: "215854" }));
  }
};

export const weathrReducer = weatherSlice.reducer;
