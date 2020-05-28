import * as inboxApi from "../../api/Inbox";
import * as types from "../types/Inbox";

export const getInboxDraftsAction = api_token => dispatch => {
  return inboxApi
    .getInboxDrafts(api_token)
    .then(dispatch({ type: types.GET_INBOX_DRAFTS_START }))
    .then(response => {
      dispatch({
        type: types.GET_INBOX_DRAFTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_INBOX_DRAFTS_ERRORS,
        payload: error.response.data
      });
    });
};

export const getInboxSavesAction = api_token => dispatch => {
  return inboxApi
    .getInboxSaves(api_token)
    .then(dispatch({ type: types.GET_INBOX_SAVES_START }))
    .then(response => {
      dispatch({
        type: types.GET_INBOX_SAVES_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_INBOX_SAVES_ERRORS,
        payload: error.response.data
      });
    });
};

export const getInboxSavesArchives = api_token => dispatch => {
  return inboxApi
    .getInboxArhives(api_token)
    .then(dispatch({ type: types.GET_INBOX_ARCHIVES_START }))
    .then(response => {
      dispatch({
        type: types.GET_INBOX_ARCHIVES_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_INBOX_ARCHIVES_ERRORS,
        payload: error.response.data
      });
    });
};
