import * as types from "../constants/topic.constants";
import api from "../../apiService";
import routeActions from "./route.actions";

// const topicsRequest = (pagenum, query, sortBy, ascending, searchBy) => async (
//   dispatch
// ) => {
//   dispatch({ type: types.GET_TOPIC_REQUEST, payload: null });
//   try {
//     // TODO
//     const res = await api.get(
//       `topics?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i&sortBy[${sortBy}]=${ascending}`
//     );
//     dispatch({ type: types.GET_TOPIC_SUCCESS, payload: res.data.data });
//   } catch (error) {
//     dispatch({ type: types.GET_TOPIC_FAILURE, payload: null });
//   }
// };
const topicsRequest = (
  pagenum,
  searchBy,
  query,
  sortBy = "title",
  order = 1
) => async (dispatch) => {
  dispatch({ type: types.GET_TOPICS_REQUEST, payload: null });
  dispatch({ type: types.CANCEL_SELECTED_TOPIC, payload: null });
  try {
    // TODO
    // console.log("query", searchBy, query);
    if (query) {
      const res = await api.get(
        `topics?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i&sortBy[${sortBy}]=${order}`
      );
      dispatch({ type: types.GET_TOPICS_SUCCESS, payload: res.data.data });
    } else {
      const res = await api.get(`topics?page=${pagenum}`);
      dispatch({ type: types.GET_TOPICS_SUCCESS, payload: res.data.data });
    }

    // console.log(res);
  } catch (error) {
    dispatch({ type: types.GET_TOPICS_FAILURE, payload: null });
  }
};

const allTopicsRequest = (pagenum) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_TOPICS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`topics/all`);
    dispatch({ type: types.GET_ALL_TOPICS_SUCCESS, payload: res.data.data });
    // console.log(res);
  } catch (error) {
    dispatch({ type: types.GET_ALL_TOPICS_FAILURE, payload: null });
  }
};

const getSelctedTopic = (topicId) => async (dispatch) => {
  dispatch({ type: types.GET_TOPIC_REQUEST, payload: null });
  try {
    const res = await api.get(`topics/${topicId}`);
    dispatch({
      type: types.GET_TOPIC_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_TOPIC_FAILURE, payload: null });
  }
};

const cancelSelected = () => async (dispatch) => {
  dispatch({ type: types.CANCEL_SELECTED_TOPIC, payload: null });
};

const createNewTopic = (
  title,
  description,
  image,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.CREATE_TOPIC_REQUEST, payload: null });
  try {
    const res = await api.post(`topics`, { title, description, image });
    dispatch({ type: types.CREATE_TOPIC_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
  } catch (error) {
    dispatch({ type: types.GET_TOPICS_FAILURE, payload: null });
    console.log(error);
  }
};

const updateTopic = (
  topicId,
  { title, description, image },
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TOPIC_REQUEST, payload: null });
  try {
    const res = await api.put(`/topics/${topicId}`, {
      title,
      description,
      image,
    });
    dispatch({ type: types.UPDATE_TOPIC_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
  } catch (error) {
    dispatch({ type: types.UPDATE_TOPIC_FAILURE, payload: null });
  }
};

const deleteTopic = (topicId, redirectTo = "__GO_BACK__") => async (
  dispatch
) => {
  dispatch({ type: types.DELETE_TOPIC_REQUEST, payload: null });
  try {
    const res = await api.delete(`/topics/${topicId}`);
    dispatch({ type: types.DELETE_TOPIC_SUCCESS, payload: res.data });
    dispatch(topicActions.topicsRequest(1));
    dispatch(routeActions.redirect(redirectTo));
  } catch (error) {
    dispatch({ type: types.DELETE_TOPIC_FAILURE, payload: null });
  }
};

const topicActions = {
  topicsRequest,
  allTopicsRequest,
  getSelctedTopic,
  cancelSelected,
  createNewTopic,
  updateTopic,
  deleteTopic,
};

export default topicActions;
