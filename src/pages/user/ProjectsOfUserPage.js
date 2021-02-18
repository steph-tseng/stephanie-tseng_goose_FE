import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../components/BigProjectCard";
import SmallProjectCard from "../../components/SmallProjectCard";
import projectActions from "../../redux/actions/project.actions";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "50vh",
    width: "100vw",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url(https://dev.artchristian.com/images/16-8140.jpg)",
    backgroundSize: "auto 160vh",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5vw",
    marginBottom: "10vh",
  },
}));

const ProjectsOfUserPage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  const projects = useSelector((state) => state.project.projects);
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.projectsByAuthor(pageNum, currentUser._id));
  }, [dispatch, pageNum, currentUser]);

  return (
    <>
      <header className={classes.header}>
        <Typography variant="h1" align="center" color="textSecondary">
          Your projects
        </Typography>
      </header>
      <Grid container justify="center">
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
      </Grid>
    </>
  );
};

export default ProjectsOfUserPage;
