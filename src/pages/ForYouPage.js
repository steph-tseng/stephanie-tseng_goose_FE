import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/user.actions";
import projectActions from "../redux/actions/project.actions";
import SmallProjectCard from "../components/SmallProjectCard";
import { Link } from "react-router-dom";
import ProjectCard from "../components/BigProjectCard";
import Pagination from "@material-ui/lab/Pagination";

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
}));

const ForYouPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);
  const projects = useSelector((state) => state.project.projects).flat();
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
    dispatch(projectActions.projectsOfFollowing(pageNum));
  }, [dispatch, pageNum]);

  const startFollowing = (userId) => {
    dispatch(userActions.followRequest(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(userActions.unfollow(userId));
    dispatch(projectActions.projectsOfFollowing(pageNum));
  };

  return (
    <div>
      <header className={classes.header}>
        <Typography variant="h1" align="center" color="textSecondary">
          For You
        </Typography>
      </header>
      <Grid container justify="center" spacing={0}>
        {projects ? (
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
          <Grid item>
            <Paper>
              <Typography variant="h6">
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
    </div>
  );
};

export default ForYouPage;
