import * as types from "../types/auth";

const initialState = {
  loading: false,
  profile: {},
  errors: {}
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_DATA_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case types.GET_PROFILE_DATA_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
export default auth;
