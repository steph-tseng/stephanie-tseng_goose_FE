import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundImage:
      "url(https://4.bp.blogspot.com/-uBDzPvlXu1I/UzLFIl70acI/AAAAAAAABHw/SNBp1LXVTkQ/s1600/2-23-14.jpg)",
    backgroundSize: "100vw auto",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "top",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paper: {
    background: "transparent",
    borderRadius: "10px",
    padding: theme.spacing(5),
    width: "25vw",
  },
  centering: {
    display: "flex",
    justifyContent: "center",
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarURL: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    const { password, password2 } = formData;
    if (password !== password2) {
      // toast.error("Passwords do not match");
    }
    const { name, email, avatarURL } = formData;
    console.log({ name, email, avatarURL, password });
    dispatch(authActions.registerAccount({ name, email, password, avatarURL }));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  const loginWithFacebook = (response) => {
    // console.log(response);
    dispatch(authActions.loginFacebook(response.accessToken));
  };
  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogle(response.accessToken));
  };

  if (isAuthenticated) return <Redirect to="/following/projects" />;
  return (
    <Grid container justify="center" classes={{ container: classes.container }}>
      <div
        style={{
          backdropFilter: "blur(10px)",
          marginTop: "20vh",
          marginBottom: "30vh",
          borderRadius: "10px",
        }}
      >
        <Paper className={classes.paper} elevation={12}>
          <Typography variant="h2" align="center" color="textSecondary">
            Register
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container justify="center">
              <Grid item sm={12} lg={12} className={classes.centering}>
                <TextField
                  placeholder="Your Avatar URL"
                  value={formData.avatarURL}
                  name="avatarURL"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12} lg={12} className={classes.centering}>
                <TextField
                  placeholder="Your Name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12} lg={12} className={classes.centering}>
                <TextField
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={12} className={classes.centering}>
                <TextField
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={12} className={classes.centering}>
                <TextField
                  placeholder="Confirm your password"
                  name="password2"
                  type="password"
                  value={formData.password2}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </form>
          <Grid container justify="center">
            <Button style={{ color: "#fff" }} onClick={handleSubmit}>
              Register
            </Button>
          </Grid>
          <p className={classes.centering} style={{ color: "#4D4D4D" }}>
            Already have an account?
            <Link
              className="font-weight-bold"
              style={{
                color: "#fff",
                textDecoration: "none",
                marginLeft: "5px",
              }}
              to="/login"
            >
              Log in
            </Link>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <FacebookLogin
              appId={FB_APP_ID}
              fields="name,email,picture"
              callback={loginWithFacebook}
              icon="fa-facebook"
              onFailure={(err) => console.log("FB LOGIN ERROR", err)}
              containerStyle={{
                textAlign: "center",
                backgroundColor: "#3b5998",
                borderColor: "#3b5998",
                flex: 1,
                display: "flex",
                color: "#fff",
                cursor: "pointer",
                marginBottom: "3px",
              }}
              buttonStyle={{
                flex: 1,
                textTransform: "none",
                padding: "12px",
                background: "none",
                border: "none",
              }}
            />
            <GoogleLogin
              // className="google-btn d-flex justify-content-center"
              className={classes.centering}
              client_id={GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={loginWithGoogle}
              onFailure={(err) => console.log("GOOGLE LOGIN ERROR", err)}
              cookiePolicy="single_host_origin"
            />
          </div>
        </Paper>
      </div>
    </Grid>
  );
};

export default RegisterPage;
