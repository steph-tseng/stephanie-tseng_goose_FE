import React, { useRef } from "react";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import gooseIcon from "../images/gooseicon.png";
import Typing from "../components/Typing";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    maxHeight: "100vh",
    left: 0,
    position: "relative",
    overflowY: "hidden",
    marginBottom: theme.spacing(3),
  },
  container2: {
    width: "100vw",
    maxHeight: "100vh",
    left: 0,
    position: "relative",
    overflowY: "hidden",
    marginBottom: theme.spacing(3),
    // padding: "50vh, 20vw",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: "20vw",
    paddingRight: "20vw",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100vw",
    maxheight: "100vh",
    filter: "brightness(80%)",
  },
  typing: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  appBar: {
    top: "90vh",
    bottom: 0,
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const trigger = useScrollTrigger({ target: window ? window : null });
  const About = useRef(null);
  const Video = useRef(null);

  return (
    <ThemeProvider theme={theme} style={{ overflowX: "hidden" }}>
      <section ref={Video}>
        <Grid container classes={{ container: classes.container }}>
          <Grid item classes={{ root: classes.video }}>
            <div>
              <video
                autoPlay
                muted
                loop
                id="flyingGeese"
                className={classes.video}
              >
                <source
                  src="https://res.cloudinary.com/dn9fltvgf/video/upload/v1611855085/My_Movie_aikwhh.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Grid>
          <div className={classes.typing}>
            {/* <TypingHeading /> */}
            <Typing />
          </div>
        </Grid>
      </section>
      <section ref={About}>
        <Grid
          container
          justify="center"
          classes={{ container: classes.container }}
          id="about"
        >
          <Grid
            item
            sm={7}
            lg={7}
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              marginTop: "20vh",
              borderTop: "5px inset #517485",
            }}
          >
            <img
              src={gooseIcon}
              alt="Canadian goose"
              style={{
                height: "50px",
                width: "50px",
                marginTop: "5vh",
              }}
            />
            <Typography variant="h2" gutterBottom>
              About
            </Typography>
          </Grid>
          <Grid
            item
            sm={7}
            lg={7}
            style={{
              marginBottom: "20vh",
              borderBottom: "5px inset #517485",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              style={{ marginBottom: "5vh" }}
            >
              Goose was born from my nostalgia for the geese that populate Bryn
              Mawr's green fields. They used to wake me up every morning and
              their honks would accompany me to every class.
            </Typography>
          </Grid>
        </Grid>
      </section>
      {/* 
      <Grid
        container
        // justify="center"
        classes={{ container: classes.container2 }}
      >
        <Paper
          style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            background: theme.palette.primary.main,
            color: "white",
          }}
        >
          <Grid container>
            <Grid sm={4} lg={4} style={{ alignSelf: "flex-start" }}>
              <img
                src="https://res.cloudinary.com/dn9fltvgf/image/upload/v1611903031/IMG_8350_mtq6ds.jpg"
                alt="geese in mist"
                style={{ height: "100%", width: "150%", objectFit: "cover" }}
              />
            </Grid>
            <Grid sm={4} lg={4}>
              <Paper>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ right: 0, left: "auto" }}
                  gutterBottom
                >
                  Goose was born from my nostalgia for the geese that populate
                  Bryn Mawr's green fields. They used to wake me up every
                  morning and their honks would accompany me to every class.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid> */}

      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
