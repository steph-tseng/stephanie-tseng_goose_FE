import { toast } from "react-toastify";
import api from "../../apiService";
import * as types from "../constants/user.constants";
import routeActions from "./route.actions";

// the middleware functions will be here
const getCurrentUserInfo = (authToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = await api.get(`/users/me`, authToken);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
    // console.log("actions", res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: null });
  }
};

const getUsers = (
  pageNum = 1,
  limit = 20,
  query = null,
  sortBy = "name"
) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&name[$regex]=${query}&name[$options]=i`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/users?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USERS_FAILURE, payload: error });
  }
};

const updateUserInfo = ({
  authToken,
  name,
  bio,
  password,
  avatarURL,
}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_REQUEST, payload: null });
  try {
    const res = await api.put(
      `/users/`,
      authToken,
      name,
      bio,
      password,
      avatarURL
    );
    console.log(res.data.data);
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data.data });
    dispatch(userActions.getCurrentUserInfo(authToken));
    dispatch(routeActions.redirect("/user/Profile"));
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_FAILURE, payload: null });
  }
};

const followRequest = (toUser) => async (dispatch) => {
  dispatch({ type: types.START_FOLLOWING_REQUEST, payload: null });
  try {
    const res = await api.post(`/following/${toUser}`);
    dispatch({ type: types.START_FOLLOWING_SUCCESS, payload: res.data.data });
    dispatch(userActions.getListOfFollowing());
    toast.success(`You are now following this user`);
  } catch (error) {
    dispatch({ type: types.START_FOLLOWING_FAILURE, payload: null });
    toast.error(error.errors.message);
  }
};

// const CheckIfFollowing = (toUser) => async (dispatch) => {};

const getListOfFollowing = () => async (dispatch) => {
  dispatch({ type: types.GET_FOLLOWING_REQUEST, payload: null });
  try {
    const res = await api.get(`/following`);

    dispatch({ type: types.GET_FOLLOWING_SUCCESS, payload: res.data.data });
  } catch (error) {
    // console.log("errrr", error);
    dispatch({ type: types.GET_FOLLOWING_FAILURE, payload: null });
  }
};

const unfollow = (toUser) => async (dispatch) => {
  dispatch({ type: types.STOP_FOLLOWING_REQUEST, payload: null });
  try {
    const res = await api.delete(`/following/${toUser}`);
    dispatch({ type: types.STOP_FOLLOWING_SUCCESS, payload: res.data.data });
    dispatch(userActions.getListOfFollowing());
    toast.success(`You have stopped following this user`);
  } catch (error) {
    dispatch({ type: types.STOP_FOLLOWING_FAILURE, payload: null });
  }
};

const userActions = {
  getCurrentUserInfo,
  getUsers,
  updateUserInfo,
  followRequest,
  getListOfFollowing,
  unfollow,
};
export default userActions;
