import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import ReactionMaterial from "./ReactionMaterial";

const useStyles = makeStyles((theme) => ({
  comment: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  subtitle: {
    marginLeft: theme.spacing(1),
  },
}));

const ReviewList = ({ reviews, handleEmojiClick, loading }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <Grid container direction="column">
          {reviews.map((review) => (
            <Grid item xs={12} key={review._id}>
              <ReviewContent
                review={review}
                handleEmojiClick={handleEmojiClick}
                loading={loading}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

const ReviewContent = ({ review, handleEmojiClick, loading }) => {
  const classes = useStyles();
  // console.log("review", review);
  return (
    <>
      <Typography variant="body1" className={classes.comment}>
        <hr />
        <br />
        <span className="comment_body">{review?.content}</span>
      </Typography>
      <Typography variant="subtitle2" className={classes.subtitle}>
        <span className="comment_by">Posted by </span>
        <span className="comment_author">{review?.user?.name} </span>
        <br />
        {/* <span className="comment_on"> on </span> */}
        <span className="comment_date">
          <Moment fromNow>{review?.createdAt}</Moment>
        </span>
      </Typography>
      <ReactionMaterial
        reactionsData={review.reactions}
        targetType="Review"
        targetId={review._id}
        handleEmojiClick={handleEmojiClick}
        loading={loading}
        size="xs"
      />
    </>
  );
};

export default ReviewList;
