import {
  AppBar,
  Box,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useScrollTrigger,
  withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import gooseLogo from "../images/cangoose.png";
import gooseLogo from "../images/mrgoose.png";
import authActions from "../redux/actions/auth.actions";
import PopoverMenu from "./PopoverMenu";
import topicActions from "../redux/actions/topic.actions";
import PropTypes from "prop-types";
import Menu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import projectActions from "../redux/actions/project.actions";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    maxHeight: "20px",
  },
  main: {
    maxWidth: "80vw",
    display: "flex",
  },
  link: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    textDecoration: "none",
    fontFamily: "Arvo",
    fontSize: "24px",
    textTransform: "none",
    // top: "-5px",

    "&:hover": {
      color: theme.palette.primary.hover,
    },
  },
  menu: {
    color: theme.palette.primary.dark,
    textDecoration: "none",
    fontFamily: "Arvo",
    fontSize: "24px",
    textTransform: "none",
    // top: "-5px",

    "&:hover": {
      color: theme.palette.primary.hover,
    },
  },
  btn: {
    "&:hover": {
      color: theme.palette.primary.hover,
    },
  },
  paper: {
    // marginRight: theme.spacing(2),
    maxHeight: "40vh",
    overflowY: "scroll",
    marginLeft: theme.spacing(3),
  },
  profileMenu: {
    marginRight: -theme.spacing(2),
    maxHeight: "40vh",
    overflowY: "scroll",
    // marginLeft: theme.spacing(3),
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: theme.palette.primary.light,
    },
  },
}))((props) => (
  <Tabs
    {...props}
    variant="scrollable"
    TabIndicatorProps={{ children: <span /> }}
  />
));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  const classes = useStyles();
  return (
    <Tab
      component={Link}
      className={classes.link}
      onClick={(event) => {
        // event.preventDefault();
      }}
      {...props}
    />
  );
}

const PublicNavbar = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const topics = useSelector((state) => state.topic.allTopics);
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 0,
    target: window ? window : null,
  });
  const [value, setValue] = React.useState(0);
  const topicPopupState = usePopupState({
    variant: "menu",
    popupId: "topicPopover",
  });
  const addNewPopupState = usePopupState({
    variant: "menu",
    popupId: "addNewPopover",
  });
  const userActionsPopupState = usePopupState({
    variant: "menu",
    popupId: "userActions",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  useEffect(() => {
    dispatch(topicActions.allTopicsRequest());
  }, [dispatch]);
  const cancelSelected = () => {
    dispatch(projectActions.cancelSelected());
    dispatch(topicActions.cancelSelected());
  };
  return (
    <>
      {!loading && (
        <AppBar
          color={trigger ? "secondary" : "transparent"}
          elevation={trigger ? 4 : 0}
          style={{ maxHeight: "70px", width: "100vw" }}
          className="appbar"
        >
          <Toolbar className={classes.toolbar}>
            <Link to="/">
              <img
                src={gooseLogo}
                alt="Goose"
                style={{ marginTop: "1vh" }}
                height="50px"
                onClick={() => setValue(0)}
              />
            </Link>
            <Grid container>
              <Grid
                item
                xs={9}
                sm={9}
                md={10}
                lg={isAuthenticated ? 11 : 10}
                xl={isAuthenticated ? 11 : 10}
                style={{ overflow: "scroll" }}
              >
                <Typography variant="h6">
                  <Box>
                    <StyledTabs
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                    >
                      <LinkTab label="Home" to="/" {...a11yProps(0)} />
                      {isAuthenticated && (
                        <LinkTab
                          label="For You"
                          to="/following/projects"
                          {...a11yProps(1)}
                          onClick={cancelSelected}
                        />
                      )}
                      {/* <StyledTabs
                    
                  > */}
                      <LinkTab
                        {...bindHover(topicPopupState)}
                        className={classes.link}
                        label="Topics"
                        to="/topics"
                        {...a11yProps(2)}
                      />
                      {/* </StyledTabs> */}
                      <LinkTab
                        label="All Projects"
                        to="/projects"
                        {...a11yProps(3)}
                      />
                      {isAuthenticated && (
                        <LinkTab
                          {...bindHover(addNewPopupState)}
                          label="Add New"
                          to="/editproject"
                          onClick={() => {
                            cancelSelected();
                            addNewPopupState.close();
                          }}
                          {...a11yProps(4)}
                        />
                      )}
                      <Menu
                        {...bindMenu(topicPopupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        getContentAnchorEl={null}
                        className={classes.paper}
                      >
                        <MenuItem
                          component={Link}
                          to="/topics"
                          className={classes.menu}
                          onClick={() => {
                            topicPopupState.close();
                            setValue(2);
                            cancelSelected();
                          }}
                        >
                          All Topics
                        </MenuItem>

                        {topics.map((option) => {
                          return (
                            <MenuItem
                              component={Link}
                              to={`/topics/${option._id}`}
                              className={classes.menu}
                              key={option._id}
                              onClick={() => {
                                topicPopupState.close();
                                setValue(2);
                                cancelSelected();
                              }}
                            >
                              {option.title}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                      <Menu
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        getContentAnchorEl={null}
                        className={classes.paper}
                        {...bindMenu(addNewPopupState)}
                      >
                        <MenuItem
                          component={Link}
                          to="/edittopic"
                          className={classes.menu}
                          onClick={() => {
                            cancelSelected();
                            addNewPopupState.close();
                            setValue(4);
                          }}
                        >
                          Topic
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/editproject"
                          className={classes.menu}
                          onClick={() => {
                            cancelSelected();
                            addNewPopupState.close();
                            setValue(4);
                          }}
                        >
                          Project
                        </MenuItem>
                      </Menu>
                      {/* <LinkTab label="Topics" to="/topics" {...a11yProps(1)} /> */}
                    </StyledTabs>
                  </Box>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={2}
                lg={isAuthenticated ? 1 : 2}
                xl={isAuthenticated ? 1 : 2}
                style={{ display: "flex" }}
              >
                <Typography
                  variant="h5"
                  style={{
                    display: "flex",
                  }}
                  gutterBottom
                >
                  {isAuthenticated ? (
                    <>
                      <IconButton
                        color="primary"
                        size="medium"
                        style={{ padding: "10px" }}
                        classes={{ root: classes.btn }}
                        component={Link}
                        to="/user/profile"
                        {...bindHover(userActionsPopupState)}
                      >
                        <AccountCircle fontSize="large" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="medium"
                        onClick={() => {
                          handleLogout();
                          setValue(1);
                        }}
                        classes={{ root: classes.btn }}
                      >
                        <ExitToAppIcon fontSize="large" />
                      </IconButton>
                      <Menu
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        getContentAnchorEl={null}
                        className={classes.profileMenu}
                        {...bindMenu(userActionsPopupState)}
                      >
                        <MenuItem
                          className={classes.menu}
                          component={Link}
                          to="/user/profile"
                          onClick={() => {
                            cancelSelected();
                            userActionsPopupState.close();
                          }}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          className={classes.menu}
                          component={Link}
                          to="/user/projects"
                          onClick={() => {
                            cancelSelected();
                            userActionsPopupState.close();
                          }}
                        >
                          Your Projects
                        </MenuItem>
                        <MenuItem
                          className={classes.menu}
                          component={Link}
                          to="/user/users"
                          onClick={() => {
                            cancelSelected();
                            userActionsPopupState.close();
                          }}
                        >
                          All Users
                        </MenuItem>
                        <MenuItem
                          className={classes.menu}
                          component={Link}
                          to="/user/following"
                          onClick={() => {
                            cancelSelected();
                            userActionsPopupState.close();
                          }}
                        >
                          Following
                        </MenuItem>
                        <MenuItem
                          className={classes.menu}
                          component={Link}
                          to="/user/messages"
                          onClick={() => {
                            cancelSelected();
                            userActionsPopupState.close();
                          }}
                        >
                          Chat
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Typography style={{ marginTop: "10px" }}>
                      <Link className={classes.link} to="/register">
                        Register
                      </Link>
                      <Link
                        className={classes.link}
                        to="/login"
                        onClick={() => setValue(1)}
                      >
                        Login
                      </Link>
                    </Typography>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default PublicNavbar;
