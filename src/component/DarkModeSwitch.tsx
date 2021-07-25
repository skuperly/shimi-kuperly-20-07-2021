import React from "react";
import Switch from "react-switch";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { yellow, grey } from "@material-ui/core/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDarkMode, toggleDarkMode } from "../features/theme/themeSlice";

const DarkModeSwitch = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const despatch = useAppDispatch();
  return (
    <Switch
      checked={darkMode}
      onChange={() => despatch(toggleDarkMode())}
      checkedIcon={
        <Brightness3Icon
          style={{ height: "100%", width: "100%", padding: 5 }}
        />
      }
      offColor={grey[900]}
      onColor={grey[900]}
      uncheckedIcon={
        <WbSunnyIcon
          htmlColor={yellow.A200}
          style={{
            height: "100%",
            width: "100%",
            padding: 5,
          }}
        />
      }
    />
  );
};

export default DarkModeSwitch;
