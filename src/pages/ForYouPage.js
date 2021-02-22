import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/user.actions";
import projectActions from "../redux/actions/project.actions";
import SmallProjectCard from "../components/SmallProjectCard";
import { Link } from "react-router-dom";
import ProjectCard from "../components/BigProjectCard";
import Pagination from "@material-ui/lab/Pagination";
import Footer from "../components/Footer";
import SearchPopover from "../components/SearchPopover";
import searchActions from "../redux/actions/search.actions";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "50vh",
    width: "100vw",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url(https://i.pinimg.com/originals/9c/be/32/9cbe322ac3f602e174faf4c4fa53b27d.jpg)",
    backgroundSize: "auto 70vh",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5vw",
    marginBottom: "10vh",
  },
  paper: {
    // height: "50vh",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    padding: theme.spacing(15),
    paddingTop: theme.spacing(7),
  },
  a: {
    textDecoration: "none",
  },
}));

const ForYouPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);
  const projects = useSelector((state) => state.project.projects).flat();
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("content");
  const showSearch = useSelector((state) => state.search.showSearch);

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const setSearch = () => {
    dispatch(searchActions.setShowSearch(showSearch ? null : "show"));
  };

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
  }, [dispatch]);

  useEffect(() => {
    if (query === "") {
      dispatch(projectActions.projectsOfFollowing(pageNum));
    }
  }, [dispatch, pageNum, query]);

  useEffect(() => {
    if (query)
      dispatch(projectActions.projectsOfFollowing(pageNum, query, searchBy));
  }, [dispatch, pageNum, query, searchBy]);

  return (
    <div>
      <header className={classes.header}>
        <Typography variant="h1" align="center" color="textSecondary">
          For You
        </Typography>
      </header>
      {/* <SearchPopover
        showSearch={showSearch}
        setSearch={setSearch}
        query={query}
        handleSearchText={handleSearchText}
      /> */}
      <Grid container justify="center" spacing={0}>
        {projects.length > 0 ? (
          <>
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
          </>
        ) : (
          <Grid item xs={12}>
            <Paper classes={{ root: classes.paper }}>
              <Typography variant="h2" style={{ fontSize: "4vh" }}>
                You're not following anyone! Go follow some people from the
                <Link to="/user/users" className={classes.a}>
                  {" "}
                  full list of users
                </Link>{" "}
                or from
                <Link to="/projects" className={classes.a}>
                  {" "}
                  the list of all projects
                </Link>{" "}
                and see their projects here.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
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

export default ForYouPage;
