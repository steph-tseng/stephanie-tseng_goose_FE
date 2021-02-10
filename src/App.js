import React, { useEffect } from "react";
import "./App.css";
import AlertMsg from "./components/AlertMsg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLayout from "./routes/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicLayout from "./routes/PublicLayout";
import { createMuiTheme, Grid, ThemeProvider } from "@material-ui/core";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/auth.actions";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#a3c0d6",
      main: "#7b99bd",
      dark: "#36558a",
      disabled: "#a1b3c2",
      hover: "#97b6cf",
      contrastText: "#000",
    },
    secondary: {
      main: "#1a2d4e",
    },
    tertiary: {
      light: "#d5daf9",
      main: "#6a75a3",
      dark: "#8b97cc",
      disabled: "#99a2c7",
      contrastText: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
  typography: {
    fontFamily: ["Arvo", "Raleway"],
  },
});

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated !== null && (
        <ThemeProvider theme={theme}>
          {loading ? (
            <>
              <Grid
                container
                justify="center"
                style={{
                  height: "120vw",
                  width: "100vw",
                  background: "white",
                  // alignItems: "center",
                  paddingTop: "10vh",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://i.gifer.com/9DYE.gif"
                  alt="flying blue watercolor bird"
                  style={{ height: "60vh", width: "auto" }}
                />
              </Grid>
            </>
          ) : (
            <Router>
              <AlertMsg />
              <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <PrivateRoute path="/admin" component={AdminLayout} />
                <Route path="/" component={PublicLayout} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          )}
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
