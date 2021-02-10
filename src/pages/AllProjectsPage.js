import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/BigProjectCard";
import SmallProjectCard from "../components/SmallProjectCard";
import projectActions from "../redux/actions/project.actions";
import userActions from "../redux/actions/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.secondary.main,
    height: "100vh",
    // paddingTop: theme.spacing(16),
    // backgroundImage:
    //   "url(https://img.freepik.com/free-vector/watercolor-background_23-2148496281.jpg?size=626&ext=jpg&ga=GA1.2.1403479552.1606608000)",
    // "url(https://canadagoosegallery.com/wp-content/uploads/2017/02/FullSizeRender-120-e1511265879107.jpg)",
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundAttachment: "fixed",
    objectFit: "cover",
    overflowX: "hidden",
    // marginBottom: theme.spacing(2),
  },
  header: {
    width: "100vw",
    height: "50vh",
    overflow: "hidden",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,7)), url(https://lh3.googleusercontent.com/proxy/g7IJW3Mugb2HtU9ydOqUPfsaKWK0Mv-I7V61T3rO8zLaIoNlyHqCk9ozbB9aYrFzwDPEVCIJW3W17RUZjI-bcULnPNRTyqv2uswoztiEWrCzC4ggkJcPim4wOcsUJKdW0j7OIT_wUDTea59XeBN-GyGQpNNn7xVN0klvHuOnU8bDgDemweGQ3rk)`,
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    dispatch(projectActions.projectsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (searchBy && query) {
      dispatch(projectActions.projectsRequest(pageNum, query, searchBy));
    }
  }, [dispatch, pageNum, searchBy, query]);

  return (
    <div>
      <header className={classes.header}>
        <Typography variant="h1">All Projects</Typography>
      </header>
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
    </div>
  );
};

export default AllProjectsPage;
