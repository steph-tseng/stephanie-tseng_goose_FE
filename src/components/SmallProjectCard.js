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
import steps from "../images/steps.jpg";
import steps2 from "../images/steps2.jpg";
import projectActions from "../redux/actions/project.actions";
import userActions from "../redux/actions/user.actions";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "40vh",
    maxWidth: "45vw",
    objectFit: "cover",
    zIndex: 10,
  },
  paper: {
    width: "25vw",
    paddingTop: "3vh",
    marginTop: "-5vh",
    borderRadius: 0,
    zIndex: 1000,
    "&:hover": {
      boxShadow: "0 0 11px rgba(0,0,0,.4)",
    },
  },
  txtCard: {
    zIndex: 10,
    height: "40vh",
    width: "30vw",
    padding: theme.spacing(3),
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    backgroundImage: `linear-gradient(rgba(137, 172, 199,.8), rgba(137, 172, 199,.8)),url(${steps2})`,
    backgroundSize: "300px",
    "&:hover": {
      boxShadow: "0 0 20px rgba(0,0,0,.8)",
    },
  },
}));

const SmallProjectCard = ({ project }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  const theme = useTheme();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
          style={{ paddingBottom: "15vh", paddingTop: "6vh" }}
          className="project-card"
          onClick={() => history.push(`/projects/${project._id}`)}
        >
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
          {project?.images?.length > 0 ? (
            <Grid container justify="center">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={project.images[0]}
                  alt={project?.title}
                  className={classes.image}
                />
              </Grid>
              <Paper
                classes={{ root: classes.paper }}
                className="hover-paper"
                elevation={1}
              >
                <Typography variant="h5" align="center">
                  {project?.title}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content?.length < 30
                      ? project.content
                      : project.content.slice(0, 30) + "..."}
                  </ReactMarkdown>
                </Typography>
              </Paper>
            </Grid>
          ) : typeof project?.images === "string" ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={project.images}
                  alt={project?.title}
                  className={classes.image}
                />
              </Grid>
              <Paper
                classes={{ root: classes.paper }}
                className="hover-paper"
                elevation={1}
              >
                <Typography variant="h5" align="center">
                  {project?.title}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content?.length < 30
                      ? project.content
                      : project.content.slice(0, 30) + "..."}
                  </ReactMarkdown>
                </Typography>
              </Paper>
            </>
          ) : (
            <Paper elevation={1} classes={{ root: classes.txtCard }}>
              <Typography
                variant="h3"
                style={{ fontSize: "4vw" }}
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
          )}
        </Grid>
      )}
    </>
  );
};

export default SmallProjectCard;
