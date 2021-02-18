import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
  isAdmin: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.LOGIN_FACEBOOK_REQUEST:
    case types.LOGIN_GOOGLE_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FACEBOOK_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
        isAdmin: payload.user.isAdmin ? true : false,
      };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
        isAdmin: payload.isAdmin ? true : false,
      };
    case types.LOGIN_FAILURE:
    case types.LOGIN_FACEBOOK_FAILURE:
    case types.LOGIN_GOOGLE_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        accessToken: "",
      };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default authReducer;
