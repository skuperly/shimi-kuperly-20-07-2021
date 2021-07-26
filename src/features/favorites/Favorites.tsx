import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICity } from "../../app/types";
import { WeatherCard } from "../../component/WeatherCard";
import Loading from "../../component/Loading";
import {
  selectFavorites,
  selectLoading,
  setSelectedCity,
  updateFavorites,
} from "../weather/weatherSlice/weathrSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      gap: 20,
      justifyContent: "space-around",
    },
    title: {
      textAlign: "center",
      marginTop: 20,
    },
  })
);

export const Favorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch(updateFavorites());
  }, [dispatch]);

  const handleFavoriteClick = (city: ICity) => {
    dispatch(setSelectedCity(city));
    history.push("/weather");
  };

  if (loading) return <Loading />;

  return (
    <Grid container className={classes.root}>
      {favorites.length ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.title}>
              My favorites
            </Typography>
          </Grid>
          {favorites.map((fav) => (
            <Grid item xs={12} md={2} key={fav.ID}>
              <WeatherCard
                weather={{
                  name: fav.name,
                  key: fav.ID,
                  weatherText: fav.currentWeather.weatherText,
                  weatherIcon: fav.currentWeather.weatherIcon,
                  temperature: {
                    max: {
                      value: fav.currentWeather.temperature.value,
                      unit: fav.currentWeather.temperature.unit,
                    },
                  },
                }}
                onClick={handleFavoriteClick}
              />
            </Grid>
          ))}
        </>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Nothing on favorites
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
