import React from "react";
import { useTheme } from "@material-ui/core/";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TabsNavBar } from "./TabsNavBar";
import { INavBarProps } from "./types";
import { DrawerNavBar } from "./DrawerNavBar";

export const NavBar = ({ navBarItems }: INavBarProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {matches ? (
        <DrawerNavBar navBarItems={navBarItems} />
      ) : (
        <TabsNavBar navBarItems={navBarItems} />
      )}
    </>
  );
};
