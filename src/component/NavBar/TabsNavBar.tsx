import React, { useEffect } from "react";
import { Tabs, Tab } from "@material-ui/core/";
import { Link, useLocation } from "react-router-dom";
import { INavBarProps } from "./types";

export const TabsNavBar = ({ navBarItems }: INavBarProps) => {
  const [value, setValue] = React.useState<string | boolean>(false);
  const location = useLocation();

  useEffect(() => {
    for (let i = 0; i < navBarItems.length; i++) {
      if (!location.pathname.indexOf(navBarItems[i].link)) {
        setValue(navBarItems[i].link);
        break;
      }
      setValue(false);
    }
  }, [location, navBarItems]);

  const handleTabChange = (event: {}, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs variant="fullWidth" value={value} onChange={handleTabChange}>
        {navBarItems.map((item) => (
          <Tab
            key={item.label}
            label={item.label}
            component={Link}
            to={item.link}
            value={item.link}
          />
        ))}
      </Tabs>
    </>
  );
};
