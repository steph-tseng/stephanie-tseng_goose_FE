import { FormControl, Input, makeStyles, Popover } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "black",
    padding: theme.spacing(2),
    paddingBottom: 0,
    paddingTop: theme.spacing(1),
    borderRadius: "10px",
    borderBottomColor: "white",
    backgroundColor: "none",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInput-underline": {
      borderBottomColor: "black",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: "#000",
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
    // "& .MuiInputBase-input": {
    //   color: "black",
    // },
  },
  input: {
    color: "#000",
  },
}));

const SearchPopover = ({ showSearch, setSearch, query, handleSearchText }) => {
  const classes = useStyles();
  return (
    <Popover
      id="search"
      open={showSearch}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 80, left: 1400 }}
      onClose={setSearch}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <FormControl color="primary">
        <Input
          margin="none"
          label="Search"
          placeholder="Key words, title..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          InputProps={{
            className: classes.input,
          }}
          type="search"
          value={query}
          onChange={handleSearchText}
          inputProps={{ "aria-label": "search" }}
          color="primary"
        />
      </FormControl>
    </Popover>
  );
};

export default SearchPopover;
