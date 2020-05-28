import * as authApi from "../../api/auth";
import * as types from "../types/auth";

export const getProfileAction = (token) => dispatch => {
  return authApi.getProfile(token)
    .then(dispatch({ type: types.GET_PROFILE_DATA_START }))
    .then(response => {
      dispatch({
        type: types.GET_PROFILE_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(errors => {
      dispatch({
        type: types.GET_PROFILE_DATA_ERROR,
        response: errors.response
      });
    });
};
