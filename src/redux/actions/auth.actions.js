import { toast } from "react-toastify";
import api from "../../apiService";
import * as types from "../constants/auth.constants";
import routeActions from "./route.actions";

// the middleware functions will be here

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post(`auth/login`, { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    // dispatch(authActions.getCurrentUser(res.data.data.accessToken));
    toast.success(`Welcome ${res.data.data.user.name}`);
    dispatch(routeActions.redirect("/following/projects"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
    toast.error(`ERROR: ` + error.message);
  }
};

const registerAccount = ({ name, email, password, avatarURL }) => async (
  dispatch
) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post(`users`, {
      name,
      email,
      password,
      avatarURL,
    });
    // console.log("avatar", avatarURL);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect("/"));
    toast.success(`Welcome ${res.data.data.user.name}`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: null });
    toast.error(`ERROR: ` + error.message);
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    // console.log("adfasasdf", res.data.data);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
    toast.error(`ERROR: ` + error.message);
  }
};

const loginFacebook = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    toast.success(`Welcome ${name}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
    toast.error(`ERROR: ` + error.message);
  }
};

const loginGoogle = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/google", { access_token });
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    toast.success(`Welcome ${name}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
    toast.error(`ERROR: ` + error.message);
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = {
  loginRequest,
  registerAccount,
  loginFacebook,
  loginGoogle,
  logout,
  getCurrentUser,
};
export default authActions;
