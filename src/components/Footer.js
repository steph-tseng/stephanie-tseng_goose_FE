import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <AppBar
      color="secondary"
      position="static"
      style={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <Grid container justify="center">
          <Typography align="center" variant="body1">
            © 2021 Goose, Inc. All Rights Reserved.
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
