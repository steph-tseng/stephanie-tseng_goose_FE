import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard";
import projectActions from "../../redux/actions/project.actions";
import userActions from "../../redux/actions/user.actions";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "50vh",
    width: "100vw",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url(https://c1.wallpaperflare.com/preview/479/236/898/goose-flock-bird-fly.jpg)",
    backgroundSize: "100vw auto",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5vw",
    marginBottom: "10vh",
    backgroundPosition: "center",
  },
  container: {
    padding: theme.spacing(10),
    paddingTop: 0,
  },
}));

const UserListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
    dispatch(projectActions.projectsOfFollowing(pageNum));
  }, [dispatch, pageNum]);

  const startFollowing = (userId) => {
    dispatch(userActions.followRequest(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(userActions.unfollow(userId));
    dispatch(projectActions.projectsOfFollowing(pageNum));
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <header className={classes.header}>
        <Typography color="textSecondary" variant="h1">
          All Users
        </Typography>
      </header>
      <Grid container spacing={10} classes={{ root: classes.container }}>
        {users?.map((user) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <ProfileCard
              user={user}
              startFollowing={startFollowing}
              handleUnfollow={handleUnfollow}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserListPage;
