import * as types from "../types";

const initialState = {
  loading: false,
  post: null,
  errors: {}
};

const singlePost = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POST_BY_ID_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case types.GET_POST_BY_ID_ERROR:
      return {
        ...state,
        errors: action.payload
      };
      case types.CLEAN_POST_DATA: 
      return {
        ...state,
        post: null
      }
    default:
      return state;
  }
};

export default singlePost;
