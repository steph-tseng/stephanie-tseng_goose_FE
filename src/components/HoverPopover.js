import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import PopupState, { bindHover, bindMenu } from "material-ui-popup-state";
import Menu from "material-ui-popup-state/HoverMenu";
import {
  Button,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
    maxHeight: "40vh",
    overflowY: "scroll",
  },
  btn: {
    color: theme.palette.primary.dark,
    textTransform: "none",
    fontFamily: "Arvo",
    fontSize: "24px",
    top: "-5px",
    // marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    padding: 0,
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: "none",
    fontFamily: "Arvo",
    fontSize: "24px",
    textTransform: "none",

    "&:hover": {
      color: theme.palette.secondary.light,
    },
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
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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

const HoverPopoverPopupState = () => {
  const classes = useStyles();
  const topics = useSelector((state) => state.topic.allTopics);
  const popupState = usePopupState({
    variant: "menu",
    popupId: "demoPopover",
  });
  const name = "Topic";

  return (
    // <PopupState variant="popover" popupId="demoPopover">
    //   {(popupState) => (
    <div>
      <StyledTabs {...bindHover(popupState)} className={classes.link}>
        <LinkTab value={0} label={name} to="/topics" {...a11yProps(1)} />
      </StyledTabs>

      {topics ? (
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          getContentAnchorEl={null}
          className={classes.paper}
        >
          <MenuItem
            as={Link}
            to="/topics"
            className={classes.link}
            onClick={popupState.close}
          >
            All Topics
          </MenuItem>

          {topics.map((option) => {
            return (
              <MenuItem
                as={Link}
                to={`/topics/${option._id}`}
                className={classes.link}
                key={option._id}
                onClick={popupState.close}
              >
                {option.title}
              </MenuItem>
            );
          })}
        </Menu>
      ) : (
        <MenuList id="menu-list-grow">
          {/* {options.map((option) => {
            return (
              <MenuItem key={option._id} onClick={popupState.close}>
                {option}
              </MenuItem>
            );
          })} */}
        </MenuList>
      )}
    </div>
  );
};
// </PopupState>
// );

HoverPopoverPopupState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HoverPopoverPopupState);
