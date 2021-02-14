import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import authActions from "../../redux/actions/auth.actions";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundSize: "100vw auto",
    background:
      "url(https://wallpaperim.net/_data/i/upload/2014/09/20/20140920779502-3a64f8e4-la.jpg)",
    // "url(https://c4.wallpaperflare.com/wallpaper/822/352/50/birds-figure-watercolor-the-canada-goose-wallpaper-preview.jpg)",
  },
  appbar: {
    backgroundColor: "rgba(26,45,78, .8)",
    height: "70px",
    width: "100vw",
    position: "fixed",
  },
  paper: {
    backgroundColor: "rgba(256,256,256,.001)",
    backdropFilter: "blur(15px)",
    padding: theme.spacing(10),
  },
  button: {
    width: "100%",
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  console.log(user);

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      classes={{ root: classes.container }}
    >
      <div className={classes.appbar}></div>
      <Paper classes={{ root: classes.paper }}>
        <Grid
          container
          justify="center"
          alignContent="center"
          direction="column"
          alignItems="center"
          spacing={10}
          style={{
            alignItems: "center",
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
          }}
        >
          <div className="">
            <Avatar
              src={
                user?.avatarURL ||
                "data:image/jpeg;base64,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"
              }
              style={{ height: "60px", width: "60px" }}
            />
          </div>
          <br />
          <Typography
            variant="h4"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            <strong>{user?.name}</strong>
          </Typography>
          {user?.bio && (
            <Typography
              variant="h6"
              color="textSecondary"
              gutterBottom
              align="center"
            >
              Bio: {user.bio}
            </Typography>
          )}
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Email: {user?.email}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            User since: <Moment format="MM-DD-YYYY">{user?.createdAt}</Moment>
          </Typography>
          <br />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => history.push("/user/profile/edit")}
          >
            Edit
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ProfilePage;
