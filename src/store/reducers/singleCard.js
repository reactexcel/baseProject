import * as types from "../types";

const initialState = {
  loading: false,
  card: null,
  errors: {}
};

const singleCard = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CARD_BY_ID_START:
      return {
        ...state,
        loading: true
      };
    case types.GET_CARD_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        card: action.payload
      };
    case types.GET_CARD_BY_ID_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    //   case types.CLEAN_CARD_DATA: 
    //   return {
    //     ...state,
    //     card: null
    //   }
    default:
      return state;
  }
};

export default singleCard;
