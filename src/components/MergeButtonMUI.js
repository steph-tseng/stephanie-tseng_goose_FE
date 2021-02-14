import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 10000,
    "& 	.MuiButtonGroup-groupedOutlined": {
      backgroundColor: "rgb(256, 256, 256, 0.2)",
      // color: "#fff",
    },
  },
  buttonGroup: {
    // color: "rgb(256, 256, 256, 0.2)",
    // color: "#fff",
    fontWeight: "5px",
    borderRadius: "10px",
    "& .MuiButton-root": {
      color: "#fff",
    },
    "& .Mui-selected": {
      // backgroundColor: "rgba(255, 255, 255, 0.2)",
      // color: "#fff",
      border: "1px solid #fff",
    },
    zIndex: 10000,
  },
  btn: {
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
  },
  selected: {
    color: "#fff",
    // border: "1px solid #fff",
    "& .Mui-selected": {
      // backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      border: "1px solid #fff",
    },
  },
}));

const SplitButton = ({ options, addTopic, addProject, setSearchBy }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const classes = useStyles();

  const handleClick = () => {
    // console.info(`You clicked ${options[selectedIndex]}`);
    if (options[selectedIndex] === "Topic") {
      addTopic();
    } else if (options[selectedIndex] === "Project") {
      addProject();
    } else if (
      options[selectedIndex] === "Title" ||
      options[selectedIndex] === "Description" ||
      options[selectedIndex] === "Content" ||
      options[selectedIndex] === "Tags"
    ) {
      setSearchBy(options[selectedIndex].toLowerCase());
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (
      options[selectedIndex] === "Title" ||
      options[selectedIndex] === "Description" ||
      options[selectedIndex] === "Content" ||
      options[selectedIndex] === "Tags"
    ) {
      setSearchBy(options[selectedIndex].toLowerCase());
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
          classes={{ root: classes.buttonGroup }}
        >
          <Button onClick={handleClick} classes={{ root: classes.btn }}>
            {options[selectedIndex]}
          </Button>
          <Button
            // color="default"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            classes={{ root: classes.btn }}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.root}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        // classes={{ root: classes.buttonGroup }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default SplitButton;
