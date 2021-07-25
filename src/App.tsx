import React from "react";
import NavBar from "./component/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useAppSelector } from "./app/hooks/useAppSelector";
import { selectDarkMode } from "./features/theme/themeSlice";
import { Container, CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import MainRoutes from "./component/MainRoutes";

const App = () => {
  const darkMode = useAppSelector(selectDarkMode);

  const appTheme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          autoHideDuration={3000}>
          <NavBar />
          <Container>
            <MainRoutes />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
