import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import topicReducer from "./topic.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import projectReducer from "./project.reducer";
import searchReducer from "./search.reducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  topic: topicReducer,
  project: projectReducer,
  route: routeReducer,
  search: searchReducer,
});
