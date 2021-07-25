import React, { useEffect, useState } from "react";
import { TextField, Theme } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAppDispatch, useDebounce } from "../../app/hooks";
import { setSelectedCity } from "../../features/weather/weatherSlice/weathrSlice";
import { getLoacation } from "../../app/service";
import { useSnackbar } from "notistack";
import { IOptionType } from "./types";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { maxWidth: 300, margin: "25px auto" },
  })
);

export const CitiesAutocomplete = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const debounceValue = useDebounce(inputValue, 500);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<IOptionType[]>([]);
  const [loading, setloading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    let active = true;

    if (active && debounceValue.trim()) {
      setloading(true);
      getLoacation(debounceValue)
        .then((res) => {
          const resData = res.data ? res.data : [];
          const values = resData.map(
            (val: { LocalizedName: any; Key: any }) => ({
              label: val.LocalizedName,
              key: val.Key,
            })
          );
          setOptions(values);
        })
        .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
        .finally(() => setloading(false));
    }

    return () => {
      active = false;
    };
  }, [debounceValue, enqueueSnackbar]);

  const handleInputCahnge = (e: React.ChangeEvent<{}>, val: string) => {
    let res = /^[a-zA-Z ]+$/.test(val);
    if (res || val === "") {
      setInputValue(val);
      return;
    }
    enqueueSnackbar("Only English letters alowed", { variant: "warning" });
  };

  return (
    <Autocomplete
      id="cities"
      className={classes.root}
      open={open}
      onChange={(e, value) => {
        value?.label &&
          dispatch(setSelectedCity({ name: value.label, key: value.key }));
      }}
      onInputChange={handleInputCahnge}
      inputValue={inputValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select City"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
