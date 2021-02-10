import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage:
      "url(https://cdn.arstechnica.net/wp-content/uploads/2019/09/Screenshot-926-640x360.png)",
    backgroundSize: "auto 120vh",
    objectFit: "cover",
    padding: theme.spacing(10),
  },
  appbar: {
    backgroundColor: "rgba(26,45,78, .8)",
    height: "70px",
    width: "100vw",
    position: "fixed",
  },
  h1: {
    marginTop: theme.spacing(14),
    marginBottom: -theme.spacing(4),
    fontWeight: "10000px",
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.appbar}></div>
      <Grid container justify="center" className={classes.root}>
        <Typography variant="h1" className={classes.h1}>
          404
        </Typography>
        <Typography variant="h1" align="center">
          You seem to have been led on a wild goose chase
        </Typography>
      </Grid>
    </>
  );
};

export default NotFoundPage;
