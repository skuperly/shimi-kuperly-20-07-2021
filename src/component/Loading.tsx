import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  progress: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <LinearProgress color="secondary" />
    </div>
  );
};

export default Loading;
