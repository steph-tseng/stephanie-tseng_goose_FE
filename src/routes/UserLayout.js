import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import PublicNavbar from "../components/PublicNavbar";
import { Grid } from "@material-ui/core";
import UserListPage from "../pages/user/UserListPage";
import ProfilePage from "../pages/user/ProfilePage";
import FollowingListPage from "../pages/user/FollowingListPage";
import PrivateRoute from "./PrivateRoute";
import EditProfilePage from "../pages/user/EditProfilePage";
import HonkChat from "../pages/user/HonkChat";
import ProjectsOfUserPage from "../pages/user/ProjectsOfUserPage";
import UserPage from "../pages/user/UserPage";

const userLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Grid container>
        <Switch>
          <PrivateRoute exact path="/user/profile" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/user/profile/edit"
            component={EditProfilePage}
          />
          <PrivateRoute
            exact
            path="/user/projects"
            component={ProjectsOfUserPage}
          />
          <PrivateRoute
            exact
            path="/user/following"
            component={FollowingListPage}
          />
          <PrivateRoute exact path="/user/messages" component={HonkChat} />
          <PrivateRoute exact path="/user/users" component={UserListPage} />
          <PrivateRoute exact path="/user/:id" component={UserPage} />

          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </Grid>
    </>
  );
};

export default userLayout;
