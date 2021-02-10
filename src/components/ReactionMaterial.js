import { IconButton, makeStyles } from "@material-ui/core";
import {
  EmojiEmotions,
  Favorite,
  Help,
  PriorityHigh,
  ThumbDown,
  ThumbUp,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    listStyle: "none",
    marginLeft: "-3rem",
    color: theme.palette.primary.main,
    // justifyContent: "center",
  },
  btn: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.hover,
    },
  },
}));

const ReactionMaterial = ({
  reactionsData,
  targetType,
  targetId,
  handleEmojiClick,
  loading,
  // size,
}) => {
  const classes = useStyles();
  return (
    <ul className={classes.list}>
      <li key="love">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "love")}
          disabled={loading}
          className={classes.btn}
        >
          <Favorite />
        </IconButton>
        {reactionsData?.love || 0}
      </li>
      <li key="thumbup">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "thumbup")}
          disabled={loading}
          className={classes.btn}
        >
          <ThumbUp />
        </IconButton>
        {reactionsData?.thumbup || 0}
      </li>
      <li key="thumbdown">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "thumbdown")}
          disabled={loading}
          className={classes.btn}
        >
          <ThumbDown />
        </IconButton>
        {reactionsData?.thumbdown || 0}
      </li>
      <li key="laugh">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "laugh")}
          disabled={loading}
          className={classes.btn}
        >
          <EmojiEmotions />
        </IconButton>
        {reactionsData?.laugh || 0}
      </li>
      <li key="emphasize">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "emphasize")}
          disabled={loading}
          className={classes.btn}
        >
          <PriorityHigh />
        </IconButton>
        {reactionsData?.emphasize || 0}
      </li>
      <li key="question">
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "question")}
          disabled={loading}
          className={classes.btn}
        >
          <Help />
        </IconButton>
        {reactionsData?.question || 0}
      </li>
    </ul>
  );
};

export default ReactionMaterial;
