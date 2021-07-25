import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavBar, INavBarItem } from "./NavBar";
import DarkModeSwitch from "./DarkModeSwitch";
import TempUnitSwitch from "./TempUnitSwitch";

const navItems: INavBarItem[] = [
  { label: "weather", link: "/weather" },
  { label: "favorites", link: "/favorites" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    toollBar: {
      justifyContent: "space-between",
    },
    menu: {
      marginRight: 20,
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      gap: 10,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toollBar}>
          <NavBar navBarItems={navItems} />
          <div className={classes.menu}>
            <DarkModeSwitch />
            <TempUnitSwitch />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
