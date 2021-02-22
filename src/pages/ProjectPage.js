import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import projectActions from "../redux/actions/project.actions";
import userActions from "../redux/actions/user.actions";
import ReactMarkdown from "react-markdown";
import { Chat, Delete, Edit } from "@material-ui/icons";
import ReviewForm from "../components/ReviewForm";
import ReactionMaterial from "../components/ReactionMaterial";
import ReviewList from "../components/ReviewList";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100vw",
    height: "50vh",
    overflow: "hidden",
    // backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,7)), url(https://lh3.googleusercontent.com/proxy/g7IJW3Mugb2HtU9ydOqUPfsaKWK0Mv-I7V61T3rO8zLaIoNlyHqCk9ozbB9aYrFzwDPEVCIJW3W17RUZjI-bcULnPNRTyqv2uswoztiEWrCzC4ggkJcPim4wOcsUJKdW0j7OIT_wUDTea59XeBN-GyGQpNNn7xVN0klvHuOnU8bDgDemweGQ3rk)`,
    backgroundSize: "120vw",
    objectFit: "cover",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    flexDirection: "column",
    backgroundPosition: "center",
  },
  paper: {
    padding: theme.spacing(5),
    margin: "10vw",
    backgroundColor: "white",
    zIndex: 10000,
    marginTop: theme.spacing(2),
    borderTopColor: theme.palette.primary.light,
    borderTop: "10px solid",
    borderRadius: 0,
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(3),
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const projectId = params.id;
  const project = useSelector((state) => state.project.selectedProject);
  const submitLoading = useSelector((state) => state.project.submitLoading);
  // console.log("project", project);
  const [reviewText, setReviewText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const handleShowComments = () => {
    if (showComments === false) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  console.log("prms", params);

  useEffect(() => {
    dispatch(projectActions.getSelctedProject(projectId));
    dispatch(projectActions.getReviews(projectId));
  }, [dispatch, projectId]);

  console.log("project", project);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(projectActions.createReview(projectId, reviewText));
    dispatch(projectActions.getReviews(projectId));
    setReviewText("");
  };

  const handleDelete = () => {
    dispatch(projectActions.deleteProject(projectId));
    history.goBack();
  };

  const handleEmojiClick = (targetType, targetId, emoji) => {
    dispatch(projectActions.postEmoji(targetType, targetId, emoji));
  };

  const startFollowing = (userId) => {
    dispatch(userActions.followRequest(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(userActions.unfollow(userId));
  };
  return (
    <>
      {project && (
        <div>
          <header className={classes.header}>
            <div
              style={{
                height: "50vh",
                width: "100vw",
                backgroundColor: "rgba(0,0,0,.7)",
                position: "absolute",
                top: 0,
                zIndex: 0,
                filter: "brightness(.2)",
                backgroundImage:
                  project?.images?.length > 0
                    ? `url(${project.images[0]})`
                    : typeof project.images === "string"
                    ? `url(${project.images})`
                    : `url(https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-ink-chinese-style-wild-goose-landscape-clean-government-elegant-banner-image_169236.jpg)`,
              }}
              className={classes.header}
            ></div>
            <Typography variant="h1" style={{ fontSize: "5vw", zIndex: 5 }}>
              {project?.title}
            </Typography>
            <br />
            <Typography variant="subtitle1" style={{ zIndex: 5 }}>
              {project?.author?.name}
              {currentUser?._id !== project?.author?._id && (
                <>
                  {!following.includes(project?.author?._id) ? (
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
            </Typography>
          </header>
          <Paper elevation={5} classes={{ root: classes.paper }}>
            <Grid container justify="center" direction="column">
              <Grid item sm={9} lg={9}>
                <Typography variant="h6">
                  <ReactMarkdown allowDangerousHtml>
                    {project?.content}
                  </ReactMarkdown>
                </Typography>
                {project?.images?.length > 0 ? (
                  <img src={project.images[0]} alt={project.title} />
                ) : typeof project.images === "string" ? (
                  <img src={project.images} alt={project.title} />
                ) : (
                  <div></div>
                )}
              </Grid>
              <br />
              <Grid item xs={12}>
                {project?.tags
                  ? project?.tags?.map((tag) => (
                      <small key={tag}>#{tag} </small>
                    ))
                  : ""}
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <IconButton aria-label="comment" onClick={handleShowComments}>
                <Chat />
              </IconButton>
              {currentUser?._id === project?.author?._id && (
                <>
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <Delete />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => history.push(`/editproject/${projectId}`)}
                  >
                    <Edit />
                  </IconButton>
                </>
              )}
            </Grid>
          </Paper>
          {showComments === true && (
            <Paper elevation={5} classes={{ root: classes.paper }}>
              <div className={classes.textBox}>
                <ReactionMaterial
                  reactionsData={project.reactions}
                  targetType="Project"
                  targetId={project._id}
                  handleEmojiClick={handleEmojiClick}
                  loading={submitLoading}
                />
                <Typography variant="h5">Comments: </Typography>
                {isAuthenticated && (
                  <ReviewForm
                    reviewText={reviewText}
                    handleInputChange={handleInputChange}
                    handleSubmitReview={handleSubmitReview}
                    loading={submitLoading}
                  />
                )}
                {project?.reviews && (
                  <>
                    {/* {console.log("object", project.reviews)} */}
                    <ReviewList
                      reviews={project.reviews[0].reviews}
                      handleEmojiClick={handleEmojiClick}
                      loading={submitLoading}
                    />
                  </>
                )}
              </div>
            </Paper>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectPage;
