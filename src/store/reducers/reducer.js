import * as Actions from "../actions";

const initialState = {
	list_edit_item: [],
	set_list_edit_item_index: [],
	list_edit_item_modal: [],
	list_modal_show: false,
	list_save_item: false
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_LIST_EDIT_ITEM: {
			return {
				...state,
				//   list_edit_item: [...state.list_edit_item, action.payload],
				list_edit_item: action.payload
			};
		}

		case Actions.SET_LIST_EDIT_ITEM_INDEX: {
			return {
				...state,
				set_list_edit_item_index: action.payload
			};
		}

		case Actions.SET_LIST_EDIT_ITEM_MODAL: {
			return {
				...state,
				list_edit_item_modal: action.payload
			};
		}

		case Actions.SET_LIST_MODAL_SHOW: {
			return {
				...state,
				list_modal_show: action.payload
			};
		}

		default: {
			return state;
		}
	}
};

export default Reducer;
