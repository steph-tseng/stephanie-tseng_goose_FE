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

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(formData));
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
            Login
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container justify="center">
              <Grid item sm={12} lg={12} className={classes.centering}>
                <TextField
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item lg={12} className={classes.centering}>
                <TextField
                  placeholder="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
          <Grid container justify="center">
            <Button style={{ color: "#fff" }} onClick={handleSubmit}>
              Login
            </Button>
          </Grid>
          <p className={classes.centering} style={{ color: "#4D4D4D" }}>
            Don't have an account?
            <Link
              className="font-weight-bold"
              style={{
                color: "#fff",
                textDecoration: "none",
                marginLeft: "5px",
                fontWeight: "10px",
              }}
              to="/register"
            >
              Sign up
            </Link>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {/* <FacebookLogin
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
            /> */}
            <GoogleLogin
              // className="google-btn d-flex justify-content-center"
              className={classes.centering}
              clientId={GOOGLE_CLIENT_ID}
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

export default LoginPage;
