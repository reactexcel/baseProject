import * as types from "../types/feed";

const InitialState = {
  loading: false,
  feed_info: null,
  errors: {}
};

const feed = (state = InitialState, action) => {
  switch (action.type) {
    case types.GET_FEED_INFO_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_FEED_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        feed_info: action.payload
      };
    case types.GET_FEED_INFO_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default feed;
