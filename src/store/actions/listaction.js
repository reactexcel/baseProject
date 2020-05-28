export const SET_LIST_EDIT_ITEM = "[LISTING] SET_LIST_EDIT_ITEM";
export const SET_LIST_EDIT_ITEM_INDEX = "[LISTING] SET_LIST_EDIT_ITEM_INDEX";
export const SET_LIST_EDIT_ITEM_MODAL = "[LISTING] SET_LIST_EDIT_ITEM_MODAL";
export const SET_LIST_MODAL_SHOW = "[LISTING] SET_LIST_MODAL_SHOW";
export const SET_LIST_ITEM = "[LISTING] SET_LIST_ITEM";

export function setListEditItem(data) {
	return {
		type: SET_LIST_EDIT_ITEM,
		payload: data,
	};
}

export function setListEditItemIndex(data, index, list, p, s, i) {
	return {
		type: SET_LIST_EDIT_ITEM_INDEX,
		payload: { content: data, index: index, list: list, p, s, i },
	};
}

export function setListEditItemModal(data, index) {
	return {
		type: SET_LIST_EDIT_ITEM_MODAL,
		payload: { content: data, index: index },
	};
}

export function setListModalShow(data) {
	return {
		type: SET_LIST_MODAL_SHOW,
		payload: data,
	};
}
