import * as types from "../constants/project.constants";
const initialState = {
  projects: [],
  totalPageNum: 1,
  selectedProject: null,
  loading: false,
  submitLoading: false,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PROJECTS_REQUEST:
    case types.GET_PROJECTS_OF_FOLLOWING_REQUEST:
    case types.GET_PROJECTS_OF_TOPIC_REQUEST:
    case types.GET_REVIEW_REQUEST:
      return { ...state, loading: true };
    case types.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload.projects,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_PROJECTS_OF_FOLLOWING_SUCCESS:
    case types.GET_PROJECTS_OF_TOPIC_SUCCESS:
      return {
        ...state,
        projects: payload.projects,
        loading: false,
      };
    case types.GET_PROJECTS_FAILURE:
    case types.GET_PROJECTS_OF_FOLLOWING_FAILURE:
    case types.GET_PROJECTS_OF_TOPIC_FAILURE:
    case types.GET_REVIEW_FAILURE:
      return { ...state, loading: false };

    case types.GET_SELECTED_PROJECT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SELECTED_PROJECT_SUCCESS:
      return {
        ...state,
        selectedProject: payload,
        loading: false,
      };
    case types.GET_SELECTED_PROJECT_FAILURE:
      return { ...state, loading: false };

    case types.SEND_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reviews: [...state.selectedProject.reviews, payload],
        },
        submitLoading: false,
      };
    case types.GET_REVIEW_SUCCESS:
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reviews: [payload],
        },
      };

    case types.CANCEL_SELECTED_PROJECT:
      return { ...state, selectedProject: null };

    case types.PROJECT_REACTION_SUCCESS:
      return {
        ...state,
        selectedProject: { ...state.selectedProject, reactions: payload },
        submitLoading: false,
      };

    case types.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reviews: [
            ...state.selectedProject.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };

    case types.CREATE_PROJECT_REQUEST:
    case types.UPDATE_PROJECT_REQUEST:
    case types.DELETE_PROJECT_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_PROJECT_SUCCESS:
      return { ...state, loading: false };
    case types.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        selectedProject: null,
        loading: false,
      };
    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProject: {},
      };

    case types.CREATE_PROJECT_FAILURE:
    case types.UPDATE_PROJECT_FAILURE:
    case types.DELETE_PROJECT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default projectReducer;
