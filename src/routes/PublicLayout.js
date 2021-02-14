import React from "react";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import HomePage from "../pages/HomePage";
import PublicNavbar from "../components/PublicNavbar";
import { Grid } from "@material-ui/core";
import TopicListPage from "../pages/TopicListPage";
import TopicPage from "../pages/TopicPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import AddEditProjectPage from "../pages/EditProjectPage";
import ForYouPage from "../pages/ForYouPage";
import AllProjectsPage from "../pages/AllProjectsPage";
import EditTopicPage from "../pages/EditTopicPage";
import ProjectPage from "../pages/ProjectPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Grid container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/topics" component={TopicListPage} />
          <Route exact path="/topics/:id" component={TopicPage} />
          <Route exact path="/projects" component={AllProjectsPage} />
          <Route exact path="/projects/:id" component={ProjectPage} />
          <PrivateRoute
            exact
            path="/following/projects"
            component={ForYouPage}
          />
          <PrivateRoute exact path="/edittopic" component={EditTopicPage} />
          <PrivateRoute exact path="/edittopic/:id" component={EditTopicPage} />
          <PrivateRoute
            exact
            path="/editproject"
            component={AddEditProjectPage}
          />
          <PrivateRoute
            exact
            path="/editproject/:id"
            component={AddEditProjectPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Grid>
    </>
  );
};

export default PublicLayout;
