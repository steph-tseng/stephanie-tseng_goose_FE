import {
  Button,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tab,
  Tabs,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
    maxHeight: "30vh",
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
    "&:hover": {
      color: theme.palette.secondary.main,
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

const PopoverMenu = ({ name, options, value, handleChange }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.btn}
        // onMouseOver={handleToggle}
        // onMouseOut={handleToggle}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          onClick={handleToggle}
          className={classes.btn}
        >
          <LinkTab
            label={name}
            to="/topics"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            {...a11yProps(1)}
          />
        </StyledTabs>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                {options[0].title ? (
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={handleClose}
                      as={Link}
                      to="/topics"
                      className={classes.link}
                    >
                      All Topics
                    </MenuItem>

                    {options.map((option) => {
                      return (
                        <Link
                          to={`/topics/${option._id}`}
                          className={classes.link}
                        >
                          <MenuItem key={option._id} onClick={handleClose}>
                            {option.title}
                          </MenuItem>
                        </Link>
                      );
                    })}
                  </MenuList>
                ) : (
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {options.map((option) => {
                      return (
                        <MenuItem key={option._id} onClick={handleClose}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default PopoverMenu;
