import React, { useMemo } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useSnackbar } from "notistack";
import {
  selectCurentCity,
  selectFavorites,
  toggleFavorite,
} from "../weatherSlice/weathrSlice";
import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

export const FavoriteButton = () => {
  const currentCity = useAppSelector(selectCurentCity);
  const favorites = useAppSelector(selectFavorites);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isFavorite = useMemo(
    () => !!favorites.find((favorite) => favorite.ID === currentCity.key),
    [currentCity, favorites]
  );
  const btnTitle = useMemo(
    () =>
      isFavorite
        ? `remove ${currentCity.name} from favorites`
        : `add ${currentCity.name} to favorites`,
    [currentCity, isFavorite]
  );

  const handleClick = () => {
    dispatch(toggleFavorite(currentCity, isFavorite));
    const msg = isFavorite
      ? `${currentCity.name} removed from favorites`
      : `${currentCity.name} added to favorites`;
    enqueueSnackbar(msg, { variant: "success" });
  };

  return (
    <>
      {matches ? (
        <Tooltip title={btnTitle}>
          <IconButton onClick={handleClick}>
            {isFavorite ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          variant="outlined"
          endIcon={
            isFavorite ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          onClick={handleClick}>
          {btnTitle}
        </Button>
      )}
    </>
  );
};
