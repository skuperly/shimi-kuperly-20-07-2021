import React from "react";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import { useAppSelector } from "../../app/hooks/useAppSelector";
import { selectTempUnit } from "../../features/theme/themeSlice";
import { tempConvert } from "../../app/utils";
import { IWeatherCardProps } from "./types";
import { Zoom } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    image: {
      margin: 15,
    },
  })
);

export const WeatherCard = ({
  weather,
  onClick,
  delay = 0,
}: IWeatherCardProps) => {
  const classes = useStyles();
  const tempUnit = useAppSelector(selectTempUnit);

  const handleClick = () => {
    if (onClick && weather.name && weather.key) {
      onClick({ name: weather.name, key: weather.key });
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }} timeout={500}>
      <Card onClick={handleClick}>
        <CardContent className={classes.root}>
          <Typography align="center" variant="h4">
            {weather.date ? (
              <Moment date={weather.date} format="ddd" />
            ) : (
              weather.name
            )}
          </Typography>

          <img
            className={classes.image}
            alt="weather"
            src={`/assets/icons/${weather.weatherIcon}.png`}
          />
          <Typography align="center" variant="body1">
            {weather.weatherText && weather.weatherText}
          </Typography>
          <Typography align="center" variant="h6">
            {!!weather.temperature.min &&
              `${tempConvert(
                weather.temperature.min,
                tempUnit
              )}° ${tempUnit} / `}
            {`${tempConvert(weather.temperature.max, tempUnit)}° ${tempUnit}`}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};
