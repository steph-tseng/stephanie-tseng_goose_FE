import * as types from "../constants/project.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "./route.actions";

const projectsRequest = (pagenum, query, searchBy) => async (dispatch) => {
  dispatch({ type: types.GET_PROJECTS_REQUEST, payload: null });
  try {
    // TODO
    if (searchBy && query) {
      // const res = await api.get(
      //   `/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i`
      // );
      const res = await api.get(
        `/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i`
      );
      dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
    } else {
      const res = await api.get(`projects?page=${pagenum}`);
      dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_PROJECTS_FAILURE, payload: null });
    toast.error(error.message);
  }
};

const projectsOfFollowing = (pageNum, query, searchBy = "author") => async (
  dispatch
) => {
  dispatch({ type: types.GET_PROJECTS_OF_FOLLOWING_REQUEST, payload: null });
  try {
    // TODO
    //page=${pageNum}&limit=10
    const res = await api.get(`/projects/issue/following`);
    dispatch({
      type: types.GET_PROJECTS_OF_FOLLOWING_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_PROJECTS_OF_FOLLOWING_FAILURE, payload: null });
    toast.error(error.message);
  }
};

const projectsByTopic = (pageNum, topicId) => async (dispatch) => {
  dispatch({ type: types.GET_PROJECTS_OF_TOPIC_REQUEST, payload: null });
  try {
    const res = await api.get(
      `/projects/topics/${topicId}?page=${pageNum}&limit=10`
    );
    dispatch({
      type: types.GET_PROJECTS_OF_TOPIC_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_PROJECTS_OF_TOPIC_FAILURE, payload: null });
  }
};

const projectsByAuthor = (pageNum, userId) => async (dispatch) => {
  dispatch({ type: types.GET_PROJECTS_BY_AUTHOR_REQUEST, payload: null });
  try {
    const res = await api.get(
      `/projects/user/${userId}?page=${pageNum}&limit=10`
    );
    dispatch({
      type: types.GET_PROJECTS_BY_AUTHOR_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_PROJECTS_BY_AUTHOR_FAILURE, payload: null });
  }
};

// const projectsRequest = (
//   topicId,
//   pagenum,
//   query,
//   sortBy,
//   ascending,
//   searchBy
// ) => async (dispatch) => {
//   dispatch({ type: types.GET_PROJECTS_REQUEST, payload: null });
//   try {
//     // TODO
//     const res = await api.get(
//       `/${topicId}/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i&sortBy[${sortBy}]=${ascending}`
//     );
//     dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
//   } catch (error) {
//     dispatch({ type: types.GET_PROJECTS_FAILURE, payload: null });
//     toast.error(error.message);
//   }
// };

const getSelctedProject = (projectId) => async (dispatch) => {
  dispatch({ type: types.GET_SELECTED_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.get(`projects/${projectId}`);
    dispatch({
      type: types.GET_SELECTED_PROJECT_SUCCESS,
      payload: res.data.data,
    });
    // console.log(res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_SELECTED_PROJECT_FAILURE, payload: null });
    toast.error(error);
  }
};

const createNewProject = ({
  title,
  content,
  topicId,
  tags,
  redirectTo = "__GO_BACK__",
}) => async (dispatch) => {
  dispatch({ type: types.CREATE_PROJECT_REQUEST, payload: null });
  try {
    console.log("====", topicId);
    const res = await api.post(`projects`, { title, content, topicId, tags });
    dispatch({
      type: types.CREATE_PROJECT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("New project has been created!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_PROJECT_FAILURE, payload: error });
  }
};

const updateProject = (
  projectId,
  title,
  content,
  topicId,
  tags,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  // console.log("ooooo", projectId);
  dispatch({ type: types.UPDATE_PROJECT_REQUEST, payload: null });
  try {
    console.log(title, content, topicId, tags);
    const res = api.put(`projects/${projectId}`, {
      title,
      content,
      topicId,
      tags,
    });
    dispatch({ type: types.UPDATE_PROJECT_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.UPDATE_PROJECT_FAILURE, payload: error });
  }
};

const cancelSelected = () => async (dispatch) => {
  dispatch({ type: types.CANCEL_SELECTED_PROJECT, payload: null });
};

const deleteProject = (projectId, redirectTo = "__GO_BACK__") => async (
  dispatch
) => {
  dispatch({ type: types.DELETE_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.delete(`projects/${projectId}`);
    dispatch({
      type: types.DELETE_PROJECT_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    dispatch(projectActions.projectsRequest(1));
    toast.success("The project has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_PROJECT_FAILURE, payload: error });
  }
};

const createReview = (projectId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`reviews/projects/${projectId}`, {
      content: reviewText,
    });
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res.data.data });
    dispatch(projectActions.getReviews(projectId));
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: null });
    toast.error(error);
  }
};

const getReviews = (projectId) => async (dispatch) => {
  dispatch({ type: types.GET_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.get(`reviews/projects/${projectId}`);
    // console.log("pls", res.data.data);
    dispatch({ type: types.GET_REVIEW_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_REVIEW_FAILURE, payload: null });
  }
};

const postEmoji = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`reactions`, { targetType, targetId, emoji });
    if (targetType === "Project") {
      dispatch({
        type: types.PROJECT_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
    toast.error(error);
  }
};

const projectActions = {
  projectsRequest,
  getSelctedProject,
  projectsByAuthor,
  projectsOfFollowing,
  projectsByTopic,
  createNewProject,
  updateProject,
  cancelSelected,
  deleteProject,
  createReview,
  getReviews,
  postEmoji,
};
export default projectActions;
