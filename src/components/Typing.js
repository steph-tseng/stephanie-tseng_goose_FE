import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  h1: {
    fontWeight: 200,
    margin: "0.4em 0",
    fontSize: "2.5vw",
    color: "#fff",
    fontFamily: "Raleway",
  },
}));

const Typing = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.h1}>
        <h1 className="line-1 anim-typewriter">Mr. Goose is sophisticated.</h1>
      </div>
    </ThemeProvider>
  );
};

export default Typing;
