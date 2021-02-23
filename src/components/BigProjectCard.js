import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "../redux/actions/project.actions";
import userActions from "../redux/actions/user.actions";
// import steps2 from "../images/steps2.jpg";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "90vh",
    width: "90vw",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    // zIndex: -1000,
    marginTop: "-10vh",
  },
  paper: {
    // position: "absolute",
    width: "30vw",
    paddingTop: "3vh",
    // top: "80vh",
    marginTop: "-10vh",
    borderRadius: 0,
    zIndex: 1000,
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.4)",
    },
  },
  txtCard: {
    zIndex: 10,
    height: "90vh",
    width: "80vw",
    padding: theme.spacing(3),
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    backgroundImage: `linear-gradient(rgba(137, 172, 199,.8), rgba(137, 172, 199,.8)),url(https://jenniferbranch.com/j/pictures/CanadianGeese.jpg)`,
    backgroundSize: "90vw",
    marginTop: "-10vh",
    "&:hover": {
      boxShadow: "0 0 20px rgba(0,0,0,.8)",
    },
  },
}));

const ProjectCard = ({ project }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const theme = useTheme();
  const history = useHistory();

  const startFollowing = (userId) => {
    dispatch(userActions.followRequest(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(userActions.unfollow(userId));
    dispatch(projectActions.projectsOfFollowing(1));
  };

  return (
    <>
      {project && (
        <Grid
          container
          justify="center"
          style={{ paddingBottom: "15vh" }}
          className="big-project-card"
          onClick={() => history.push(`/projects/${project._id}`)}
        >
          {typeof project?.images === "string" ? (
            <Grid container className="project-card" justify="center">
              <img
                src={project?.images}
                alt={project?.title}
                className={classes.image}
              />
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "-1vh",
                }}
              >
                <Paper
                  className="author-popup"
                  style={{
                    // display: "flex",
                    padding: theme.spacing(1),
                    width: "25vw",
                    height: "4vh",
                    // justifyContent: "center",
                  }}
                  elevation={20}
                >
                  <Typography variant="h6">
                    {"By " + project?.author?.name || "author"}
                  </Typography>
                  {isAuthenticated && (
                    <>
                      {!following.includes(project.author._id) ? (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => startFollowing(project.author._id)}
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleUnfollow(project.author._id)}
                        >
                          Unfollow
                        </Button>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>
              <Paper
                classes={{ root: classes.paper }}
                className="hover-paper"
                elevation={1}
              >
                <Typography variant="h4" align="center">
                  {project?.title}
                </Typography>
                <Typography variant="h6" align="center">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content?.length < 20
                      ? project.content
                      : project.content.split(0, 20)[0]}
                  </ReactMarkdown>
                </Typography>
              </Paper>
            </Grid>
          ) : project?.images?.length > 0 ? (
            <Grid container justify="center" className="project-card">
              <img
                src={project.images[0]}
                alt={project?.title}
                className={classes.image}
              />
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "-1vh",
                }}
              >
                <Paper
                  className="author-popup"
                  style={{
                    // display: "flex",
                    padding: theme.spacing(1),
                    width: "25vw",
                    height: "4vh",
                    // justifyContent: "center",
                  }}
                  elevation={20}
                >
                  <Typography variant="h6">
                    {"By " + project?.author?.name || "author"}
                  </Typography>
                  {isAuthenticated && (
                    <>
                      {!following.includes(project.author._id) ? (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => startFollowing(project.author._id)}
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleUnfollow(project.author._id)}
                        >
                          Unfollow
                        </Button>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>
              <Paper
                classes={{ root: classes.paper }}
                className="hover-paper"
                elevation={1}
              >
                <Typography variant="h4" align="center">
                  {project?.title}
                </Typography>
                <Typography variant="h6" align="center">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content?.length < 20
                      ? project.content
                      : project.content.split(0, 20)[0]}
                  </ReactMarkdown>
                </Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid container justify="center" className="project-card">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "-1vh",
                }}
              >
                <Paper
                  className="author-popup"
                  style={{
                    // display: "flex",
                    padding: theme.spacing(1),
                    width: "25vw",
                    height: "4vh",
                    // justifyContent: "center",
                  }}
                  elevation={20}
                >
                  <Typography variant="h6">
                    {"By " + project?.author?.name || "author"}
                  </Typography>
                  {isAuthenticated && (
                    <>
                      {!following.includes(project.author._id) ? (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => startFollowing(project.author._id)}
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleUnfollow(project.author._id)}
                        >
                          Unfollow
                        </Button>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>

              <Paper elevation={1} classes={{ root: classes.txtCard }}>
                <Typography
                  variant="h1"
                  style={{ fontSize: "5vw" }}
                  align="center"
                >
                  {project?.title}
                </Typography>
                <Typography variant="h5" align="center">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content?.length < 30
                      ? project.content
                      : project.content.slice(0, 30) + "..."}
                  </ReactMarkdown>
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProjectCard;
