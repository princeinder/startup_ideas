import {
  LOADING,
  GET_PROJECTS,
  ADD_PROJECT,
  GET_ERRORS,
  UPDATE_PROJECT,
} from "../types/index";

export const initialState = {
  loading: false,
  projects: [],
  success: {},
  error: {},
};

export function projectReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload.data,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        success: action.payload.message,
        projects: [...state.projects, action.payload.data],
        error: {},
        loading: false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        success: action.payload.message,
        projects: [
          ...state.projects.filter(
            (project) => project._id !== action.payload.data._id
          ),
          action.payload.data,
        ],
        error: {},
        loading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload,
        success: {},
        loading: false,
      };

    default:
      return state;
  }
}
