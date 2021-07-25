import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,
});

export const getLoacation = (searchTerm: string) => {
  return http.get(
    `locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`
  );
};
export const getGeoLoacation = (geoLocation: { lat: number; lon: number }) => {
  return http.get(
    `locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${geoLocation.lat.toFixed(
      1
    )},${geoLocation.lon.toFixed(1)}`
  );
};

export const getCurrentWeather = (locationKey: string) => {
  return http.get(`currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
};

export const getForecasts = (locationKey: string) => {
  return http.get(`forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
};
