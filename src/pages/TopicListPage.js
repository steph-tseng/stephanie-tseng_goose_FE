import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import TopicCard from "../components/TopicCard";
import TopicCard2 from "../components/TopicCard2";
import Pagination from "@material-ui/lab/Pagination";
import projectActions from "../redux/actions/project.actions";
import topicActions from "../redux/actions/topic.actions";
import pattern from "../images/pattern.jpg";

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
  pattern: {
    width: "100vw",
    height: "50vh",
    overflow: "hidden",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1)), url(${pattern})`,
    backgroundSize: "400px",
    backgroundColor: "rgba(0,0,0,0.7)",
    backgroundPosition: "center bottom",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
    // marginTop: "70px",
  },
  container: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  pagination: {
    marginBottom: theme.spacing(2),
  },
}));

const TopicListPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const topics = useSelector((state) => state.topic.topics);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalPageNum = useSelector((state) => state.topic.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const [showSearch, setShowSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const clickTopic = (topicId) => {
    history.push(`/topics/${topicId}`);
    setShowSearch(null);
  };

  useEffect(() => {
    dispatch(topicActions.topicsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (searchBy) {
      dispatch(topicActions.topicsRequest(pageNum, searchBy, query));
    }
  }, [dispatch, pageNum, searchBy, query]);

  const addTopic = () => {
    dispatch(topicActions.cancelSelected());
    history.push(`/edittopic`);
  };

  const addProject = () => {
    dispatch(projectActions.cancelSelected());
    history.push(`/editproject`);
  };
  return (
    <div className={classes.root}>
      {/* <h1>Topics</h1> */}
      <div
        style={{
          height: "70px",
          width: "100vw",
          backgroundColor: theme.palette.secondary.main,
          position: "fixed",
          zIndex: 10,
        }}
      ></div>
      <div className={classes.pattern}>
        <Typography
          variant="h1"
          color="textSecondary"
          align="center"
          style={{ marginTop: "70px" }}
        >
          Topics
        </Typography>
        {/* <img src={pattern} alt="goose silhouette pattern" /> */}
      </div>

      <Grid
        container
        justify="center"
        spacing={3}
        className={classes.container}
      >
        {topics?.map((topic) => {
          return (
            <Grid item key={topic._id} onClick={() => clickTopic(topic._id)}>
              {/* <TopicCard topic={topic} /> */}
              <TopicCard2 topic={topic} />
            </Grid>
          );
        })}
      </Grid>
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
    </div>
  );
};

export default TopicListPage;
