import * as types from "../types/Inbox";

const initialState = {
  loading: false,
  inbox_drafts: [],
  inbox_saves: [],
  inbox_archives: [],
  errors: {}
};

const inbox = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INBOX_DRAFTS_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_INBOX_DRAFTS_SUCCESS:
      return {
        ...state,
        loading: false,
        inbox_drafts: action.payload
      };
    case types.GET_INBOX_DRAFTS_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case types.GET_INBOX_SAVES_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_INBOX_SAVES_SUCCESS:
      return {
        ...state,
        loading: false,
        inbox_saves: action.payload
      };
    case types.GET_INBOX_SAVES_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case types.GET_INBOX_ARCHIVES_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_INBOX_ARCHIVES_SUCCESS:
      return {
        ...state,
        loading: false,
        inbox_archives: action.payload
      };
    case types.GET_INBOX_ARCHIVES_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default inbox;
