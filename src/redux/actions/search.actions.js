import * as types from "../constants/search.constants";

const setShowSearch = (setShow) => async (dispatch) => {
  dispatch({ type: types.SET_SHOW_SEARCH, payload: setShow });
};

const searchActions = {
  setShowSearch,
};

export default searchActions;
