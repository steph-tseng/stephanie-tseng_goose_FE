import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const TopicCard = ({ topic }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Honking goose"
          height="140"
          image={
            topic.image
              ? topic.image
              : "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/geese-440437.jpg?h=167408a8&itok=Pm52-GR1"
          }
          title="Honking goose"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {topic.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TopicCard;
