import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Favorites } from "../features/favorites";
import { Weather } from "../features/weather";
import {
  selectError,
  setDefaultLocation,
  setError,
} from "../features/weather/weatherSlice/weathrSlice";

const MainRoutes = () => {
  const errorMsg = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errorMsg) {
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
    dispatch(setError(""));
  }, [errorMsg, dispatch, enqueueSnackbar]);

  useEffect(() => {
    dispatch(setDefaultLocation());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/weather" component={Weather} />
        <Route path="/favorites" component={Favorites} />
        <Redirect to="/weather" />
      </Switch>
    </>
  );
};

export default MainRoutes;
