import * as types from "../constants/search.constants";
const initialState = {
  showSearch: null,
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_SHOW_SEARCH:
      return {
        ...state,
        showSearch: payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
