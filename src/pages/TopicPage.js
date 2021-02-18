import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProjectCard from "../components/BigProjectCard";
import SmallProjectCard from "../components/SmallProjectCard";
import projectActions from "../redux/actions/project.actions";
import topicActions from "../redux/actions/topic.actions";
import Pagination from "@material-ui/lab/Pagination";
import SearchPopover from "../components/SearchPopover";
import searchActions from "../redux/actions/search.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "5vh",
  },
  header: {
    height: "50vh",
    position: "relative",
    // backgroundImage:
    //   "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1)), url(https://lh3.googleusercontent.com/proxy/FmPQYHjV9X_OkCyq0GkYWcm-Rmo6uqdUP1iduMFFZSH2Su78llFmC9QC2cn94fhhJqLTYze_DregWe7yYjitnqNtXDNquQoWSZyOhLcb42H7iHHRwrCGjmyxOhaG5NeVmSmba6V0gMn4bEvlDb_LDA)",
  },
}));

const TopicPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const topicId = params.id;
  const topic = useSelector((state) => state.topic.selectedTopic);
  const projects = useSelector((state) => state.project.projects);
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);

  const project = useSelector((state) => state.project.selectedProject);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("content");
  const showSearch = useSelector((state) => state.search.showSearch);

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const setSearch = () => {
    dispatch(searchActions.setShowSearch(showSearch ? null : "show"));
  };

  // useEffect(() => {
  //   dispatch(projectActions.getSelctedProject("60050f60a3ca4e001770c439"));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(topicActions.getSelctedTopic(topicId));
  }, [dispatch, topicId]);

  useEffect(() => {
    dispatch(projectActions.projectsByTopic(pageNum, topicId));
  }, [dispatch, topicId, pageNum]);

  useEffect(() => {
    if (query)
      dispatch(
        projectActions.projectsByTopic(pageNum, topicId, query, searchBy)
      );
  }, [dispatch, topicId, pageNum, query, searchBy]);

  const handleDelete = () => {
    dispatch(topicActions.deleteTopic(topicId));
    projects.forEach((project) =>
      dispatch(projectActions.deleteProject(project._id))
    );
    history.goBack();
  };

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  return (
    <Grid container className={classes.root}>
      <SearchPopover
        showSearch={showSearch}
        setSearch={setSearch}
        query={query}
        handleSearchText={handleSearchText}
      />
      <div className={classes.header}>
        {topic?.image[0] ? (
          <img
            src={
              topic?.image
              // ? topic.image
              // : "https://www.allaboutbirds.org/guide/assets/photo/59953131-480px.jpg"
            }
            alt={topic?.title}
            style={{ height: "60vh", width: "100vw", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{ height: "60vh", width: "100vw", position: "relative" }}
          ></div>
        )}
        <div
          style={{
            height: "60vh",
            width: "100vw",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,.8)",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
          }}
        >
          <Typography variant="h1" color="primary" style={{ fontSize: "10vw" }}>
            {topic?.title}
          </Typography>
          {isAdmin && (
            <Button variant="secondary" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>

        {projects && (
          <Grid container justify="center">
            <Grid item sm={12} lg={12} style={{ marginTop: "-5vh", zIndex: 2 }}>
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
    </Grid>
  );
};

export default TopicPage;
