import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import { INavBarProps } from "./types";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  itemText: {
    textAlign: "center",
  },
});

export const DrawerNavBar = ({ navBarItems }: INavBarProps) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((open) => !open);
  };

  const handleClick = (link: string) => {
    setOpen(false);
    history.push(link);
  };

  return (
    <>
      <IconButton onClick={() => toggleDrawer()}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List className={classes.list}>
          {navBarItems.map((item) => (
            <ListItem
              button
              key={item.label}
              selected={!location.pathname.indexOf(item.link)}
              onClick={() => handleClick(item.link)}>
              <ListItemText
                primary={item.label.toUpperCase()}
                className={classes.itemText}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
