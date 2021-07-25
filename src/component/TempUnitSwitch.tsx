import React from "react";
import Switch from "react-switch";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { grey } from "@material-ui/core/colors";

import { ETemprature, selectTempUnit, toggleTempUnit } from "../features/theme";

const TempUnitSwitch = () => {
  const tempUnit = useAppSelector(selectTempUnit);
  const despatch = useAppDispatch();
  return (
    <div>
      <Switch
        checked={tempUnit === ETemprature.C ? true : false}
        onChange={() => despatch(toggleTempUnit())}
        checkedIcon={
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: 5,
              marginLeft: 5,
            }}>
            C
          </div>
        }
        offColor={grey[900]}
        onColor={grey[900]}
        uncheckedIcon={
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: 5,
              marginLeft: 5,
            }}>
            F
          </div>
        }
      />
    </div>
  );
};

export default TempUnitSwitch;
