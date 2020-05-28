import * as postApi from "../../api/Posts";
import * as sectionApi from "../../api/Sections";
import * as notesApi from "../../api/Notes";
import * as types from "../types";
import * as listApi from "../../api/List";
import * as listItemsApi from "../../api/ListItems";
import * as answersApi from "../../api/Answers";
import * as questionsApi from "../../api/Qustions";

export const getPosts = () => dispatch => {
  return postApi.getPosts().then(res => {
    dispatch({
      type: types.SET_POSTS,
      res: res.map(item => {
        item.sections.map(section => {
          section.notes = section.notes.map(note => {
            return note;
          });
          section.lists = section.lists.map(list => {
            return list;
          });
          section.questions = section.questions.map(question => {
            return question;
          });
          return section;
        });
        return item;
      })
    });
    return res;
  });
};

// export const getSection = post => dispatch => {
// 	return sectionApi.getSections(post.id).then(res => {
// 		return Promise.all(res.map(section => dispatch(getNotes(section)))).then(
// 			val => {
// 				post.items = [...val];
// 				return post;
// 			}
// 		);
// 	});
// };

// export const getNotes = section => dispatch => {
// 	return notesApi.getNotes(section.id).then(res => {
// 		section.items = [
// 			...res.map(note => {
// 				note.type = "note";
// 				return note;
// 			}),
// 		];
// 		return section;
// 	});
// };

// export const getLists = section => dispatch => {
// 	return;
// };

// POST

export const sendPost = post => dispatch => {
  return postApi.postPosts(post).then(res => {
    dispatch({
      type: types.ADD_POST,
      res
    });
    return res;
  });
};

export const editPost = (id, post, statePost) => dispatch => {
  return postApi.putPosts(statePost.id, post).then(res => {
    dispatch({
      type: types.EDIT_POST,
      id,
      res
    });
    return res;
  });
};

export const deletePost = postId => (dispatch, getState) => {
  console.log("postId from api", postId);
  const state = getState();
  dispatch({
    type: types.DELETE_POST,
    postId
  });
  return postApi.deletePosts(postId).then(res => {
    return res;
  });
};

//SECTION
export const addSection = (postId, section) => (dispatch, getState) => {
  const state = getState();
  return sectionApi
    .postSections({ ...section, post_id: state.post[postId].id })
    .then(res => {
      dispatch({
        type: types.ADD_SECTION,
        postId,
        res
      });
      return res;
    });
};
export const editSection = (
  postId,
  sectionId,
  section,
  stateSec
) => dispatch => {
  return sectionApi
    .putSections(stateSec.id, { ...section, post_id: stateSec.post_id })
    .then(res => {
      dispatch({
        type: types.EDIT_SECTION,
        postId,
        sectionId,
        res
      });
      return res;
    });
};
export const deleteSection = (postId, sectionId) => (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: types.DELETE_SECTION,
    postId,
    sectionId
  });
  return sectionApi
    .deleteSections(state.post[postId].sections[sectionId].id)
    .then(res => {
      return res;
    });
};

// NOTES
export const addNotes = (p, s, i, notes) => (dispatch, getState) => {
  const state = getState();
  return notesApi
    .postNotes({
      ...notes,
      section_id: state.post[p].sections[s].id
    })
    .then(res => {
      dispatch({
        type: types.ADD_NOTE,
        p,
        s,
        i,
        res: {
          ...res,
          ...notes
        }
      });
      return res;
    });
};

export const toggleEditNote = (postId, sectionId, noteIndex, notes) => {
  return {
    type: types.TOGGLE_EDIT_NOTE,
    postId,
    sectionId,
    noteIndex
  };
};

export const editNotes = (p, s, i, notes) => (dispatch, getState) => {
  const state = getState();
  // dispatch({
  // 	type: types.EDIT_NOTE,
  // 	p,
  // 	s,
  // 	i,
  // 	res: {
  // 		...notes,
  // 	},
  // });
  return notesApi
    .putNotes(state.post[p].sections[s].notes[i].id, {
      ...notes,
      section_id: state.post[p].sections[s].id
    })
    .then(res => {
      dispatch({
        type: types.EDIT_NOTE,
        p,
        s,
        i,
        res: {
          ...res,
          ...notes
        }
      });
      return res;
    });
};

export const deleteNotes = (postId, sectionId, noteId) => (
  dispatch,
  getState
) => {
  const state = getState();

  dispatch({
    type: types.DELETE_NOTE,
    postId,
    sectionId,
    noteId
  });
  return notesApi
    .deleteNotes(state.post[postId].sections[sectionId].notes[noteId].id)
    .then(res => {
      return res;
    });
};

export const toggleAddNote = (postIndex, sectionIndex, note) => {
  note.w = 5;
  return {
    type: types.ADD_EDIT_NOTE,
    postIndex,
    sectionIndex,
    note
  };
};

// RESize
export const saveSizeBack = (p, s, i, itemType, h, w) => (
  dispatch,
  getState
) => {
  const state = getState();
  const elem = state.post[p].sections[s][itemType][i];
  if (elem) {
    const id = elem.id;
    elem.h = h;
    elem.w = w;
    switch (itemType) {
      case "lists":
        listApi.putList(id, elem);
        return;
      case "notes":
        notesApi.putNotes(id, elem);
        return;
      case "questions":
        questionsApi.putQA(id, elem);
        return;
    }
  }
};
export const savePosBack = (p, s, i, x, y, itemType) => (
  dispatch,
  getState
) => {
  const state = getState();
  const elem = state.post[p].sections[s][itemType][i];
  if (elem) {
    const id = elem.id;
    elem.x = x;
    elem.y = y;
    switch (itemType) {
      case "lists":
        listApi.putList(id, elem);
        return;
      case "notes":
        notesApi.putNotes(id, elem);
        return;
      case "questions":
        questionsApi.putQA(id, elem);
        return;
    }
  }
};

export const saveSize = (post, section, item, itemType, h, w) => {
  console.log(
    "from save size post, section, item, itemType, h, w",
    post,
    "section-",
    section,
    "item-",
    item,
    "itemType-",
    itemType,
    h,
    w
  );
  return {
    type: types.ITEM_RESIZE,
    post,
    section,
    item,
    itemType,
    w,
    h
  };
};
export const savePos = (p, s, i, x, y, itemType) => {
  return {
    type: types.ITEM_SAVE_POS,
    p,
    s,
    i,
    x,
    y,
    itemType
  };
};

//LIST

export const addCreateList = (postIndex, sectionIndex, elem) => {
  console.log("addCreateList", postIndex, sectionIndex, elem);
  return {
    type: types.ADD_CREATE_LIST,
    postIndex,
    sectionIndex,
    elem
  };
};

export const createList = (postIndex, sectionIndex, listIndex, list) => (
  dispatch,
  getState
) => {
  const state = getState();
  listApi
    .postList({
      ...list,
      section_id: state.post[postIndex].sections[sectionIndex].id
    })
    .then(res => {
      Promise.all(
        list.listing_items.map(item => dispatch(createListItems(item, res.id)))
      ).then(listing_items => {
        dispatch({
          type: types.ADD_LIST,
          postIndex,
          sectionIndex,
          listIndex,
          list: {
            ...res,
            listing_items: listing_items
          }
        });
      });
    });
};

export const toggleEditList = (p, s, i) => {
  return {
    type: types.TOGGLE_EDIT_LIST,
    p,
    s,
    i
  };
};

export const editList = (p, s, i, list) => (dispatch, getState) => {
  const state = getState();
  // dispatch({
  // 	type: types.EDIT_LIST,
  // 	p,
  // 	s,
  // 	i,
  // 	res: {
  // 		...list,
  // 		h: 200 + list.listing_items.length * 50,
  // 		listing_items: list.listing_items,
  // 	},
  // });
  listApi
    .putList(state.post[p].sections[s].lists[i].id, {
      ...list,
      section_id: state.post[p].sections[s].id
    })
    .then(res => {
      Promise.all(
        list.listing_items.map(item =>
          item.id === undefined
            ? dispatch(createListItems(item, res.id))
            : dispatch(updateListItems(item.id, res.id, item.title))
        )
      ).then(listing_items => {
        dispatch({
          type: types.EDIT_LIST,
          p,
          s,
          i,
          res: {
            ...list,
            ...res,
            listing_items: listing_items
          }
        });
        return res;
      });
    });
};

export const deleteList = (p, s, i) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: types.DELETE_LIST,
    p,
    s,
    i
  });
  return listApi.deleteList(state.post[p].sections[s].lists[i].id);
};

export const createListItems = (item, id) => dispatch => {
  return listItemsApi.postList({ ...item, listing_id: id });
};

export const editListItems = (title, list, p, s, i) => dispatch => {
  return listItemsApi
    .putListItems(list.list.listing_items[list.index].id, {
      title: title,
      listing_id: list.list.id
    })
    .then(res => {
      dispatch({
        type: types.EDIT_LIST_ITEMS,
        p,
        s,
        i,
        list: list.index,
        res
      });
    });
};

export const updateListItems = (id, listId, title) => dispatch => {
  return listItemsApi.putListItems(id, {
    title: title,
    listing_id: listId
  });
};

export const deleteListItems = (p, s, i, list) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: types.DELETE_LIST_ITEMS,
    p,
    s,
    i,
    list
  });
  return listItemsApi.deleteList(
    state.post[p].sections[s].lists[i].listing_items[list].id
  );
};

// QA
export const createQA = (p, s, i, elem) => (dispatch, getState) => {
  const state = getState();
  return questionsApi
    .postQA({
      question: elem.title,
      section_id: state.post[p].sections[s].id
    })
    .then(res => {
      Promise.all(
        elem.answers.map(item => dispatch(createAnswer(res.id, item.answer)))
      ).then(answers => {
        dispatch({
          type: types.CREATE_QA,
          p,
          s,
          i,
          res: {
            ...elem,
            ...res,
            answers: answers
          }
        });
      });
    });
};

export const editQA = (p, s, i, elem) => (dispatch, getState) => {
  const state = getState();
  // dispatch({
  // 	type: types.EDIT_QA,
  // 	p,
  // 	s,
  // 	i,
  // 	res: {
  // 		...elem,
  // 		answers: elem.answers,
  // 	},
  // });
  return questionsApi
    .putQA(state.post[p].sections[s].questions[i].id, {
      question: elem.title,
      section_id: state.post[p].sections[s].id
    })
    .then(res => {
      Promise.all(
        elem.answers.map(item =>
          item.id === undefined
            ? dispatch(createAnswer(res.id, item.answer))
            : dispatch(updateUnswers(item.id, res.id, item.answer))
        )
      ).then(answers => {
        dispatch({
          type: types.EDIT_QA,
          p,
          s,
          i,
          res: {
            ...elem,
            ...res,
            answers: answers
          }
        });
        return res;
      });
    });
};

export const toggleAddQA = (p, s, elem) => {
  elem.w = 5;
  return {
    type: types.TOGGLE_ADD_QA,
    p,
    s,
    elem
  };
};

export const toggleEditQA = (p, s, i) => {
  return {
    type: types.TOGGLE_EDIT_QA,
    p,
    s,
    i
  };
};
export const deleteQA = (p, s, i) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: types.DELETE_QA,
    p,
    s,
    i
  });
  return questionsApi.deleteQA(state.post[p].sections[s].questions[i].id);
};

const createAnswer = (id, answer) => dispatch => {
  return answersApi.postAnswer({ question_id: id, answer: answer });
};

const updateUnswers = (awswerId, id, answer) => dispatch => {
  return answersApi.putAnswer(awswerId, { question_id: id, answer: answer });
};

export const getPostById = id => dispatch => {
  return postApi
    .getPostsById(id)
    .then(dispatch({ type: types.GET_POST_BY_ID_START }))
    .then(response => {
      dispatch({
        type: types.GET_POST_BY_ID_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
		type: types.GET_POST_BY_ID_ERROR,
		payload: error.response
      });
    });
};

export const cleanPostInfo = () => dispatch =>{
	return dispatch({type: types.CLEAN_POST_DATA})
}
