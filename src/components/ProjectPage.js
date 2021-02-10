import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import projectActions from "../redux/actions/project.actions";
import { Button, Divider, IconButton } from "@material-ui/core";
import { Chat, Delete, Edit } from "@material-ui/icons";
import ReviewForm from "../components/ReviewForm";
// import ReactionList from "../components/ReactionList";
import ReactionMaterial from "../components/ReactionMaterial";
import userActions from "../redux/actions/user.actions";
import ReviewList from "../components/ReviewList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "4rem",
  },
  textBox: {
    // height: "18vh",
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "left",
    alignContent: "center",
    boxShadow: "2px 2px 4px #1b1e21",
    borderRadius: "10px",
    marginBottom: "5vh",
    padding: theme.spacing(2),
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    width: "100%",
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const projectId = params.projectId;
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

  useEffect(() => {
    dispatch(projectActions.getSelctedProject(projectId));
    dispatch(projectActions.getReviews(projectId));
  }, [dispatch, projectId]);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(projectActions.createReview(projectId, reviewText));
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
    <div className={classes.root}>
      <div className={classes.textBox}>
        <small>{project?.author?.name}</small>
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
        <Divider />
        <h1 className=" mt-1">{project?.title}</h1>
        <ReactMarkdown allowDangerousHtml>{project?.content}</ReactMarkdown>
        {project?.tags
          ? project?.tags?.map((tag) => <small key={tag}>#{tag} </small>)
          : ""}

        {isAuthenticated && (
          <>
            <Divider />
            <div className={classes.btnGroup}>
              <hr />
              <IconButton aria-label="comment" onClick={handleShowComments}>
                <Chat />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <Delete />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => history.push(`/editproject/${projectId}`)}
              >
                <Edit />
              </IconButton>
            </div>
          </>
        )}
      </div>
      {showComments === true && (
        <div className={classes.textBox}>
          <ReactionMaterial
            reactionsData={project.reactions}
            targetType="Project"
            targetId={project._id}
            handleEmojiClick={handleEmojiClick}
            loading={submitLoading}
          />
          <h5 id="commentsSection" className="text-left">
            Comments:
          </h5>
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
      )}
    </div>
  );
};

export default ProjectPage;
