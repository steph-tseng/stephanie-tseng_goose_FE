import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import AlertMsg from "../components/AlertMsg";
import PublicNavbar from "../components/PublicNavbar";
import { Grid } from "@material-ui/core";
import UserListPage from "../pages/Admin/UserListPage";
import ProfilePage from "../pages/Admin/ProfilePage";
import FollowingListPage from "../pages/Admin/FollowingListPage";
import PrivateRoute from "./PrivateRoute";
import EditProfilePage from "../pages/Admin/EditProfilePage";
import HonkChat from "../pages/Admin/HonkChat";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Grid container>
        <AlertMsg />
        <Switch>
          <PrivateRoute exact path="/admin/profile" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/admin/profile/edit"
            component={EditProfilePage}
          />
          <PrivateRoute exact path="/admin/users" component={UserListPage} />
          <PrivateRoute
            exact
            path="/admin/following"
            component={FollowingListPage}
          />
          <PrivateRoute exact path="/admin/messages" component={HonkChat} />
          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </Grid>
    </>
  );
};

export default AdminLayout;
