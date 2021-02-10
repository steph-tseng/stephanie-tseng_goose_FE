import * as types from "../constants/user.constants";
const initialState = {
  users: [],
  following: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CURRENT_USER_REQUEST:
    case types.GET_USERS_REQUEST:
    case types.UPDATE_USER_REQUEST:
    case types.START_FOLLOWING_REQUEST:
    case types.GET_FOLLOWING_REQUEST:
    case types.STOP_FOLLOWING_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, selectedUser: payload, loading: false };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_FOLLOWING_SUCCESS:
      // console.log("payload", payload);
      return {
        ...state,
        following: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.UPDATE_USER_SUCCESS:
    case types.START_FOLLOWING_SUCCESS:
    case types.STOP_FOLLOWING_SUCCESS:
      return { ...state, loading: false };
    case types.GET_CURRENT_USER_FAILURE:
    case types.GET_USERS_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.START_FOLLOWING_FAILURE:
    case types.GET_FOLLOWING_FAILURE:
    case types.STOP_FOLLOWING_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
