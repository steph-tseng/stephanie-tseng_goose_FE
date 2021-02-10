import * as types from "../constants/topic.constants";

const initialState = {
  topics: [],
  allTopics: [],
  totalPageNum: 1,
  selectedTopic: null,
  loading: false,
  submitLoading: false,
};

const topicReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_TOPICS_REQUEST:
    case types.GET_ALL_TOPICS_REQUEST:
    case types.GET_TOPIC_REQUEST:
    case types.CREATE_TOPIC_REQUEST:
    case types.UPDATE_TOPIC_REQUEST:
    case types.DELETE_TOPIC_REQUEST:
      return { ...state, loading: true };

    case types.GET_TOPICS_SUCCESS:
      return {
        ...state,
        totalPageNum: payload.totalPages,
        topics: payload.topics,
        loading: false,
      };

    case types.GET_ALL_TOPICS_SUCCESS:
      return {
        ...state,
        allTopics: payload.topics,
        loading: false,
      };
    case types.GET_TOPIC_SUCCESS:
      return { ...state, selectedTopic: payload, loading: false };

    case types.CREATE_TOPIC_SUCCESS:
    case types.UPDATE_TOPIC_SUCCESS:
    case types.DELETE_TOPIC_SUCCESS:
      return { ...state, loading: false };

    case types.GET_TOPICS_FAILURE:
    case types.GET_ALL_TOPICS_FAILURE:
    case types.GET_TOPIC_FAILURE:
    case types.CREATE_TOPIC_FAILURE:
    case types.UPDATE_TOPIC_FAILURE:
    case types.DELETE_TOPIC_FAILURE:
      return { ...state, loading: false };

    case types.CANCEL_SELECTED_TOPIC:
      return { ...state, selectedTopic: null };

    default:
      return state;
  }
};

export default topicReducer;
