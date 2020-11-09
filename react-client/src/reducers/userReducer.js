import { LOADING, SIGNUP_USER, SIGNIN_USER, GET_ERRORS } from "../types/index";

export const initialState = {
  loading: false,
  user: [],
  success: {},
  error: {},
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_USER:
      return {
        ...state,
        success: action.payload,
        error: {},
        loading: false,
      };
    case SIGNIN_USER:
      return {
        ...state,
        success: action.payload,
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
