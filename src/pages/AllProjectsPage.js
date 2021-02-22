import {
  FormControl,
  Grid,
  Input,
  makeStyles,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/BigProjectCard";
import Footer from "../components/Footer";
import SplitButton from "../components/MergeButtonMUI";
import SearchPopover from "../components/SearchPopover";
import SmallProjectCard from "../components/SmallProjectCard";
import projectActions from "../redux/actions/project.actions";
import searchActions from "../redux/actions/search.actions";
import userActions from "../redux/actions/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.secondary.main,
    height: "100vh",
    // paddingTop: theme.spacing(16),
    // backgroundImage:
    //   "url(https://img.freepik.com/free-vector/watercolor-background_23-2148496281.jpg?size=626&ext=jpg&ga=GA1.2.1403479552.1606608000)",
    // "url(https://canadagoosegallery.com/wp-content/uploads/2017/02/FullSizeRender-120-e1511265879107.jpg)",
    // backgroundSize: "100vw 100vh",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "top",
    // backgroundAttachment: "fixed",
    // objectFit: "cover",
    overflowX: "hidden",
    // marginBottom: theme.spacing(2),
  },
  header: {
    width: "100vw",
    height: "50vh",
    overflow: "hidden",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,7)), url(https://www.customwallpaper.net.au/wp-content/uploads/2015/12/AdobeStock_62110777-600x399.jpeg)`,
    backgroundSize: "100vw auto",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(10),
    // marginTop: "70px",
  },

  container: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },

  pagination: {
    marginBottom: theme.spacing(2),
  },
}));

const AllProjectsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const following = useSelector((state) => state.user.following).map(
  //   (item) => item._id
  // );
  const showSearch = useSelector((state) => state.search.showSearch);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("content");

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(projectActions.projectsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (query) {
      dispatch(projectActions.projectsRequest(pageNum, query, searchBy));
    }
  }, [dispatch, pageNum, searchBy, query]);

  const setSearch = () => {
    dispatch(searchActions.setShowSearch(showSearch ? null : "show"));
  };

  return (
    <div className={classes.root}>
      <SearchPopover
        showSearch={showSearch}
        setSearch={setSearch}
        query={query}
        handleSearchText={handleSearchText}
      />
      <Grid container className={classes.header}>
        <Typography variant="h1">All Projects</Typography>
      </Grid>
      {projects && (
        <Grid container justify="center">
          <Grid item sm={12} lg={12} style={{ marginTop: "-5vh" }}>
            <ProjectCard project={projects[0]} />
          </Grid>
          {projects?.slice(1).map((project) => {
            return (
              <Grid item xs={6} sm={6} lg={5} key={project._id}>
                <SmallProjectCard project={project} />
              </Grid>
            );
          })}
        </Grid>
      )}
      {totalPageNum > 1 && (
        <Grid container justify="center">
          <Pagination
            defaultPage={1}
            page={pageNum}
            count={totalPageNum}
            onChange={handlePageChange}
            // variant="outlined"
            shape="rounded"
            variant="outlined"
            size="large"
            color="primary"
            classes={{ root: classes.pagination }}
          />
        </Grid>
      )}
      <Footer />
    </div>
  );
};

export default AllProjectsPage;
