import * as feedApi from "../../api/Feed";
import * as types from "../types/feed";

export const getFeedsListAction = api_token => dispatch => {
  return feedApi
    .getFeedDataApi(api_token)
    .then(dispatch({ type: types.GET_FEED_INFO_START }))
    .then(response => {
      dispatch({
        type: types.GET_FEED_INFO_SUCCESS,
        payload: response.data
      });
    })
    .catch(errors => {
      dispatch({
        type: types.GET_FEED_INFO_ERRORS,
        payload: errors.response
      });
    });
};
