import React, { useMemo } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import {
  selectCurentCity,
  selectCurentForecasts,
  selectCurentWeather,
  selectLoading,
} from "./weatherSlice/weathrSlice";
import { WeatherCard } from "../../component/WeatherCard";
import Loading from "../../component/Loading";
import { selectTempUnit } from "../theme/themeSlice";
import { tempConvert } from "../../app/utils";
import { CitiesAutocomplete } from "../../component/CitiesAutocomplete";
import { FavoriteButton } from "./FavoriteButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
    },
    currentWeather: {
      display: "flex",
      justifyContent: "space-between",
    },
    currentCity: {
      display: "flex",
    },
    weatherText: {
      margin: 20,
    },
    cardsContainer: {
      gap: 20,
      justifyContent: "space-around",
    },
  })
);

export const Weather = () => {
  const currentCiry = useAppSelector(selectCurentCity);
  const currentForecasts = useAppSelector(selectCurentForecasts);
  const currentWeather = useAppSelector(selectCurentWeather);
  const tempUnit = useAppSelector(selectTempUnit);
  const loading = useAppSelector(selectLoading);
  const classes = useStyles();

  const currentTemp = useMemo(
    () => tempConvert(currentWeather?.temperature!, tempUnit),
    [currentWeather, tempUnit]
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <CitiesAutocomplete />
      </Grid>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={12}>
          {!!currentWeather && (
            <Paper className={classes.root}>
              <div className={classes.currentWeather}>
                <div>
                  <Typography variant="h4" className={classes.currentCity}>
                    {currentCiry.name}
                    <img
                      alt="weather"
                      src={`/assets/icons/${currentWeather.weatherIcon}.png`}
                    />
                  </Typography>
                  <Typography variant="h6">
                    {`${currentTemp}° ${tempUnit}`}
                  </Typography>
                </div>
                <div>
                  <FavoriteButton />
                </div>
              </div>
              <Typography
                align="center"
                variant="h5"
                className={classes.weatherText}>
                {currentForecasts?.weatherText}
              </Typography>
              <Grid container className={classes.cardsContainer}>
                {currentForecasts?.daysWeather.map((dayForcaste, i) => (
                  <Grid item xs={12} md={2} key={dayForcaste.date}>
                    <WeatherCard weather={dayForcaste} delay={i * 100} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Grid>
      )}
    </Grid>
  );
};
