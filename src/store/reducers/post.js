import * as types from "../types";
import list from "../../components/list";

const post = (state = [], action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_POSTS:
      return action.res;
    case types.ADD_POST:
      return [...state, { ...action.res, sections: [] }];
    case types.EDIT_POST:
      newState[action.id] = {
        ...action.res,
        sections: newState[action.id].sections
      };
      return newState;
    case types.DELETE_POST:
      newState.splice(action.id, 1);
      return newState;
    case types.ADD_SECTION:
      newState[action.postId].sections = [
        ...newState[action.postId].sections,
        {
          ...action.res,
          notes: [],
          lists: [],
          questions: []
        }
      ];
      return newState;
    case types.EDIT_SECTION:
      newState[action.postId].sections[action.sectionId] = {
        ...action.res,
        notes: newState[action.postId].sections[action.sectionId].notes,
        lists: newState[action.postId].sections[action.sectionId].lists,
        questions: newState[action.postId].sections[action.sectionId].questions
      };
      return newState;
    case types.DELETE_SECTION:
      newState[action.postId].sections.splice(action.sectionId, 1);
      return newState;
    case types.ADD_EDIT_NOTE:
      newState[action.postIndex].sections[action.sectionIndex].notes = [
        ...newState[action.postIndex].sections[action.sectionIndex].notes,
        action.note
      ];
      return newState;
    case types.ADD_NOTE:
      newState[action.p].sections[action.s].notes[action.i] = action.res;
      return newState;
    case types.EDIT_NOTE:
      newState[action.p].sections[action.s].notes[action.i] = action.res;
      newState[action.p].sections[action.s].notes[action.i].h = 400;
      return newState;
    case types.TOGGLE_EDIT_NOTE:
      newState[action.postId].sections[action.sectionId].notes[
        action.noteIndex
      ].edit = true;
      newState[action.postId].sections[action.sectionId].notes[
        action.noteIndex
      ].h = 650;
      return newState;
    case types.DELETE_NOTE:
      newState[action.postId].sections[action.sectionId].notes.splice(
        [action.noteId],
        1
      );
      return newState;
    case types.ITEM_RESIZE:
      newState[action.post].sections[action.section][action.itemType][
        action.item
      ] = {
        ...newState[action.post].sections[action.section][action.itemType][
          action.item
        ],
        w: action.w && action.w,
        h: action.h && action.h
      };
      return newState;
    case types.ITEM_SAVE_POS:
      newState[action.p].sections[action.s][action.itemType][action.i] = {
        ...newState[action.p].sections[action.s][action.itemType][action.i],
        x: action.x && action.x,
        y: action.y && action.y
      };
      return newState;
    case types.ADD_CREATE_LIST:
      newState[action.postIndex].sections[action.sectionIndex].lists = [
        ...newState[action.postIndex].sections[action.sectionIndex].lists,
        action.elem
      ];
      return newState;
    case types.TOGGLE_EDIT_LIST:
      newState[action.p].sections[action.s].lists[action.i].edit = true;
      newState[action.p].sections[action.s].lists[action.i].h =
        200 +
        newState[action.p].sections[action.s].lists[action.i].listing_items
          .length *
          200;
      newState[action.p].sections[action.s].lists[action.i].w = 5;
      return newState;
    case types.EDIT_LIST:
      newState[action.p].sections[action.s].lists[action.i] = action.res;
      return newState;
    case types.ADD_LIST:
      newState[action.postIndex].sections[action.sectionIndex].lists[
        action.listIndex
      ] = action.list;
      return newState;
    case types.EDIT_LIST_ITEMS:
      newState[action.p].sections[action.s].lists[action.i].listing_items[
        action.list
      ] = action.res;
      return newState;
    case types.DELETE_LIST:
      newState[action.p].sections[action.s].lists.splice(action.i, 1);
      return newState;

    case types.DELETE_LIST_ITEMS:
      newState[action.p].sections[action.s].lists[
        action.i
      ].listing_items.splice(action.list, 1);
      return newState;
    case types.TOGGLE_ADD_QA:
      newState[action.p].sections[action.s].questions = [
        ...newState[action.p].sections[action.s].questions,
        action.elem
      ];
      return newState;
    case types.TOGGLE_EDIT_QA:
      newState[action.p].sections[action.s].questions[action.i].edit = true;
      newState[action.p].sections[action.s].questions[action.i].h =
        300 +
        newState[action.p].sections[action.s].questions[action.i].answers
          .length *
          200;
      return newState;
    case types.CREATE_QA:
      newState[action.p].sections[action.s].questions[action.i] = action.res;
      return newState;
    case types.EDIT_QA:
      newState[action.p].sections[action.s].questions[action.i] = action.res;
      return newState;
    case types.DELETE_QA:
      newState[action.p].sections[action.s].questions.splice(action.i, 1);
      return newState;

    default:
      return state;
  }
};
export default post;
