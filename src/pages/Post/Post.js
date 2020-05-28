import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import { connect } from "react-redux";
import * as post from "../../store/actions/post";
import iconWhizle from "../../img/icon-whizle.svg";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { followUserApi, unFollowUserApi } from "../../api/Follows";
import SectionDetails from "../../components/section_card_details/SectionDetails";
import { postUpvote } from "../../api/Reactions";
import { putNotes, saveNoteApi, shareNote } from "../../api/Notes";
import Share from "../../buttons/Share";
import Follow from "../../buttons/Follow";
import Upvote from "../../buttons/Upvote";
import AddSection from "../../buttons/AddSection";
import Delete from "../../buttons/Delete";
import Swal from "sweetalert2";
import Edit from "../../buttons/Edit";
import AddSectionModal from "../../Modals/AddSectionModal";
import EditSectionModal from "../../Modals/EditSectionModal";
import { postSections } from "../../api/Sections";
import { putPosts } from "../../api/Posts";
import EditPostModal from "../../Modals/EditPostModal";
import { saveListApi, shareList, putList } from "../../api/List";
import { saveQaApi, shareQaApi } from "../../api/Qustions";
import EditNoteModal from "../../Modals/EditNoteModal";
import EditListModal from "../../Modals/EditListModal";
import { putListItems } from "../../api/ListItems";
export const ContextApp = React.createContext();

const Post = props => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  const [editListFormVisible, setEditListFormVisible] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [postsList, setPosts] = useState([]);
  const [copiedCard, copyCard] = useState({});
  const [edit, toggleEdit] = useState(false);
  const [postsFormVisible, setPostsFormVisible] = useState(false);
  const [postVal, changePostVal] = useState(0);
  const [secVal, changeSecVal] = useState({
    postId: 0,
    secId: 0
  });

  const [editSectionsFormVisible, setEditSectionsFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [notesFormVisible, setNotesFormVisible] = useState(false);
  const [sectionsFormVisible, setSectionsFormVisible] = useState(false);
  const [editedPost, setEditedPost] = useState(0);
  const [editValues, changeEditValues] = useState({});
  const [file, setFile] = useState();
  const [richText, setRichText] = useState("");

  useEffect(() => {
    props.getPost(props.match.params.postId);
  }, [props.match.params.postId]);

  console.log("props.post", props.post);
  const followHandler = () => {};
  const mainContent = <div>Kuku</div>;

  const followUnfollowHandler = (action, user_id) => {
    if (action === "follow") {
      followUserApi(user_id)
        .then(response => {
          toast.success(`Successfully followed!`);
        })
        .catch(error => {
          toast.error(`You can't follow this user`);
        });
    }

    if (action === "unfollow") {
      unFollowUserApi(user_id)
        .then(response => {
          toast.success(`Successfully unfollowed!`);
        })
        .catch(error => {
          toast.error(`You can't unfollow this user`);
        });
    }
  };

  const upvoteHandler = activity_id => {
    postUpvote(localStorage.getItem("api_token"), activity_id)
      .then(response => {
        toast.success(`You have upvoted the post successfully!`);
      })
      .catch(error => {
        toast.error("You can't upvote it again !");
      });
  };

  const addSectionHandler = n => {
    setEditedPost(n);
    changeSecVal({ postId: n, secId: null });
    setSectionsFormVisible(true);
    toggleEdit(false);
    setSectionsFormVisible(true);
  };

  const toggleEditPost = i => {
    setPostsFormVisible(true);
    toggleEdit(true);
    changePostVal(i);
  };

  // DELETE POST
  const deletePost = i => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          let promise = new Promise((res, rej) => {
            res(props.deletePost(i));
          });
          promise
            .then(() => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your post has been deleted.",
                "success"
              );
              props.getPosts();
            })
            .then(() => {
              props.history.push("/internal");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your post is safe :)",
            "error"
          );
        }
      });
  };

  const addNote = (s, p) => {
    // let elem = {};
    // elem.type = "note";
    // elem.edit = true;
    // elem.w = 5;
    // elem.h = 400;
    // elem.title = "";
    // props.toggleAddNote(p, s, elem);
  };

  const hideHandler = modal => {
    if (modal === "section") {
      setSectionsFormVisible(false);
    }

    if (modal === "section-edit") {
      setEditSectionsFormVisible(false);
    }
    if (modal === "post") {
      setPostsFormVisible(false);
    }
  };

  // SECTIONS
  const saveSection = values => {
    const formData = new FormData();
    values.items = [];
    values.image = file;
    values.post_id = props.post.id;

    for (let key in values) {
      formData.append(key, values[key]);
    }

    postSections(formData)
      .then(response => {
        props.getPost(props.match.params.postId);
      })
      .catch(error => {
        toast.error("You can't add a section!");
      });
    setSectionsFormVisible(false);
  };

  const addSection = n => {
    setEditedPost(n);
    changeSecVal({ postId: n, secId: null });
    setSectionsFormVisible(true);
    toggleEdit(false);
    setSectionsFormVisible(true);
  };

  const toggleEditSection = (section, post) => {
    changeSecVal({ postId: post, secId: section });
    setSectionsFormVisible(true);
    toggleEdit(true);
  };

  const editSection = values => {
    values.image_file = file;
    props.editSection(
      secVal.postId,
      secVal.secId,
      values,
      props.post[secVal.postId].sections[secVal.secId]
    );
    setPostsFormVisible(false);
    toggleEdit(false);

    setSectionsFormVisible(false);
    toggleEdit(false);
  };

  const deleteSection = (sectionNum, postNum) => {
    props.deleteSection(postNum, sectionNum);
  };

  const handleImageChange = e => {
    e.preventDefault();
    let file = e.target.files[0];
    changePostVal(prev => ({ ...prev, file: file }));
    setFile(file);
  };

  const addNoteHandler = item => {
    setRichText(item.description);
    setEditNote(item);
    setNotesFormVisible(true);
  };

  const saveList = (e, listItems, p, s, i, h) => {
    let elem = {};
    const formData = new FormData(e.target);
    e.preventDefault();
    for (let entry of formData.entries()) {
      elem[entry[0]] = entry[1];
    }
    elem.type = "list";
    elem.edit = false;
    elem.listing_items = listItems;
    elem.w = props.post[p].sections[s].lists[i].w;
    elem.h = h;
    props.post[p].sections[s].lists[i].id !== undefined
      ? props.editList(p, s, i, elem)
      : props.createList(p, s, i, elem);

    // posts_cloned[p].items[s].items[i] = elem;

    // setPosts([...posts_cloned]);
  };

  const saveNote = values => {
    const data = {
      api_token: localStorage.getItem("api_token"),
      title: values.title,
      tags: values.tags,
      title: values.title,
      url: values.url,
      description: richText,
      section_id: values.section_id,
      index: values.index,
      x: values.x,
      y: values.y,
      h: values.h,
      w: values.w
    };
    putNotes(values.id, data)
      .then(response => {
        toast.success(`The note was edited successfully!`);
      })
      .then(() => {
        setNotesFormVisible(false);
        props.getPosts();
      });
  };

  const savePost = values => {
    values.image_file = file;
    values.items = [];
    props.sendPost(values);
    setPostsFormVisible(false);
    props.getPosts();
  };

  const editPost = values => {
    const formData = new FormData();

    if (file !== undefined && file !== null) {
      values.image_file = file;
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }

    values.image_file = file;

    putPosts(props.post.id, formData)
      .then(response => {
        props.getPost(props.match.params.postId);
      })
      .catch(error => {
        toast.error("You can't edit the post!");
      });
    setPostsFormVisible(false);
    toggleEdit(false);
  };

  //saving items

  const saveHandler = (item, type) => {
    console.log("item", item, type);
    let action;
    if (type === "note") {
      action = saveNoteApi;
    } else if (type === "list") {
      action = saveListApi;
    } else if (type === "qa") {
      action = saveQaApi;
    }
    action(item.id)
      .then(response => {
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully!`
        );
      })
      .catch(error => {
        toast.error(`You can't save this ${type}!`);
      });
  };

  //sharing items

  const shareHandler = (item, type) => {
    let action;
    if (type === "note") {
      action = shareNote;
    } else if (type === "list") {
      action = shareList;
    } else if (type === "qa") {
      action = shareQaApi;
    }
    action(item.id)
      .then(response => {
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully!`
        );
      })
      .catch(error => {
        toast.error(`You can't share this ${type}!`);
      });
  };

  // EDIT NOTE

  const hideEditNoteModalHandler = modal => {
    if (modal === "note-edit") {
      setEditFormVisible(false);
      setEditableItem(null);
      setRichText("");
    }
  };

  const quillHandler = value => {
    setRichText(value);
  };

  const saveEditNoteHandler = values => {
    values.description = richText;
    values.section_id = editableItem.section_id;
    putNotes(editableItem.id, values)
      .then(() => {
        toast.success(`Note edited successfully!`);
      })
      .then(() => {
        setEditFormVisible(false);
        props.getPost(props.match.params.postId);
      })
      .catch(error => {
        toast.error(`You can't change the note at the moment!`);
      });
  };

  const openEditNoteHandler = item => {
    setEditableItem(item);
    setEditFormVisible(true);
    setRichText(item.description);
  };

  // EDIT LIST

  const openEditListHandler = item => {
    console.log('openEditListHandleropenEditListHandler');
    
    setEditableItem(item);
    setEditListFormVisible(true);
  };

  const closeEditListFormVisible = () => {
    setEditListFormVisible(false);
    setEditableItem(null);
  };

  const saveEditList = (values, listItems) => {
    console.log("values", values, listItems);

    let data = {
      section_id: editableItem.section_id,
      title: values.title,
      x: values.x,
      y: values.y,
      h: values.h,
      w: values.w
    };
    putList(editableItem.id, data)
      .then(response => {
        listItems.map((item, index) => {
          putListItems(response.data.id, {
            title: item.title,
            listing_id: index
          });
        });
      })
      .then(() => {
        setEditableItem(null);
        setEditListFormVisible(false);
      })
      .then(() => {
        toast.success(`List edited successfully!`);
      })
      .catch(error => {
        toast.error(`You can't edit the list at the moment!`);
      });
  };
  const setListItemsHandler = () => {};

  console.log(editableItem);

  return (
    <ContextApp.Provider
      value={{
        // saveList,
        saveNote
      }}
    >
      {" "}
      <EditListModal
        show={editListFormVisible}
        onHide={closeEditListFormVisible}
        onSubmit={saveEditList}
        setListItems={setListItemsHandler}
        item={editableItem}
      />
      <EditNoteModal
        show={editFormVisible}
        onHide={hideEditNoteModalHandler}
        dialogClassName="modalForm"
        onSubmit={saveEditNoteHandler}
        quillHandler={quillHandler}
        item={editableItem}
      />
      <AddSectionModal
        show={sectionsFormVisible}
        onHide={hideHandler}
        onSubmit={saveSection}
        handleImageChange={handleImageChange}
      />
      <EditSectionModal
        show={editSectionsFormVisible}
        onHide={hideHandler}
        onSubmit={saveSection}
        handleImageChange={handleImageChange}
        item={props.post}
      />
      <EditPostModal
        show={postsFormVisible}
        onHide={hideHandler}
        edit={edit}
        editPost={editPost}
        savePost={savePost}
        handleImageChange={handleImageChange}
        post={props.post}
      />
      <DIV>
        <Header />
        <div className="main-content_wrapper">
          {!props.post ? (
            <div className="loader"></div>
          ) : (
            <div className="main-content">
              <div className="main-content__header">
                <div className="main-data">
                  <div className="main-data__left-side">
                    <img
                      src={iconWhizle}
                      className="icon-whizle"
                      alt="icon-whizle"
                    />
                    <div className="main-data__left-side_page-name">
                      {props.post.slug}
                    </div>
                  </div>
                  <div className="main-data__right-side">
                    <div className="main-data__right-side_logo"></div>
                    <div className="user-details">
                      <div className="main-data__right-side_name">
                        Dwayne Johnson
                      </div>
                      <div className="main-data__right-side_logo_follow">
                        <div
                          className="follow_btn"
                          onClick={() =>
                            followUnfollowHandler("follow", props.post.user_id)
                          }
                        >
                          Follow
                        </div>
                        <div
                          className="follow_btn"
                          onClick={() =>
                            followUnfollowHandler(
                              "unfollow",
                              props.post.user_id
                            )
                          }
                        >
                          Unfollow
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="data-details">
                  <Moment fromNow>{props.post.updated_at}</Moment>
                </div>
              </div>
              <div className="post-details">
                <div className="post-details__name">
                  <div className="post-details__name-header">
                    {props.post.title}
                  </div>
                  <div className="post-details__name-description">
                    {props.post.description ? props.post.description : null}
                  </div>
                </div>
                {props.post.image ? (
                  <div className="post-logo">
                    <img
                      src={props.post.image}
                      alt="post image"
                      className="post-image"
                    />
                  </div>
                ) : null}
              </div>
              <div className="action-buttons">
                <div className="action-buttons__left-side">
                  <Follow followHandler={followHandler} />
                  <Share />
                  <Upvote upvoteHandler={() => upvoteHandler(props.post.id)} />
                  <AddSection
                    addSectionHandler={addSectionHandler}
                    num={props.post.id}
                  />
                  <Edit edit={toggleEditPost} />
                  <Delete deleteHandler={() => deletePost(props.post.id)} />
                </div>
              </div>

              {props.post.tags && (
                <div className="topics">
                  {props.post.tags.split(",").map(item => (
                    <div className="topic" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              )}
              {props.post.sections.length > 0
                ? props.post.sections.map(item => (
                    <SectionDetails
                      key={item.id}
                      editHandler={addNoteHandler}
                      action={"true"}
                      item={item}
                      saveHandler={saveHandler}
                      shareHandler={shareHandler}
                      openEditNoteHandler={openEditNoteHandler}
                      openEditListHandler={openEditListHandler}
                    />
                  ))
                : null}
            </div>
          )}
        </div>
      </DIV>
    </ContextApp.Provider>
  );
};

const DIV = styled.div`
  .main-content_wrapper {
    padding: 38px 24px 69px 24px;
    display: flex;
    justify-content: center;
  }

  .main-content {
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 11px 38px 42px 38px;
    margin-bottom: 30px;
  }

  .main-data__right-side_logo {
    width: 41px;
    height: 41px;
    border-radius: 50%;
    background-color: grey;
    margin-right: 13px;
  }

  .main-data__right-side_name {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }

  .main-data__right-side_logo_follow {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #ff906d;
    text-decoration: underline;
  }

  .main-data__left-side_page-name {
    font-size: 20px;
    color: #56aeff;
  }

  .main-data {
    margin-right: 17px;
  }

  .main-data__left-side {
    display: flex;
    align-items: flex-start;
  }

  .icon-whizle {
    margin-right: 30px;
  }

  .main-data__right-side {
    display: flex;
  }

  .data-details {
    font-size: 12px;
    color: #a7a7a7;
  }

  .main-content__header {
    display: flex;
    justify-content: space-between;
  }

  .post-details__name {
    max-width: 90%;
  }

  .post-details__name-header {
    font-size: 32px;
    line-height: 35px;
  }

  .post-details__name-description {
    font-size: 16px;
  }

  .post-logo {
    width: 54px;
    height: 54px;
    border-radius: 3px;
    background-color: grey;
  }

  .post-details {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 18px;
    margin-bottom: 18px;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 17px;
  }

  .button-follow,
  .button-share,
  .button-add-section {
    margin-right: 10px;
  }

  .topics {
    font-size: 12px;
    color: #ff906d;
    display: flex;
    margin-bottom: 22px;

    .topic {
      margin-right: 20px;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
    }

    .topic img {
      margin-right: 10px;
    }
  }

  .economics {
    margin-right: 32px;
  }

  .section-wrapper {
    box-shadow: 4px 4px 0 0 #56aeff;
    border-radius: 3px;
    border: 1px solid #e7e7e7;
    padding: 24px;
    margin-bottom: 26px;
  }

  .card-wrapper {
    margin-right: 0;
  }

  .notes,
  .cardData,
  .qa-card {
    width: 100%;
    height: 100%;
  }

  .frame {
    width: 100%;
  }

  .post-image {
    width: 54px;
    height: 54px;
  }

  .post-button {
    padding: 14px;
    margin-bottom: 30px;
    border: 1px solid #e7e7e7;
    .button-add-post {
      padding: 2px 12px;
      background-color: #ff906d;
      border-radius: 3px;
      color: #fff;
      border: none;
    }
  }

  .action-buttons__right-side {
    display: flex;
    flex-wrap: wrap;
  }

  button {
    max-height: 25px;
    margin: 5px;
  }

  .ul {
    width: 100%;
    right: 0px;
    top: 40px;
  }

  .follow_btn {
    cursor: pointer;
  }
`;

const mapStateToProps = state => {
  return {
    post: state.singlePost.post,
    loading: state.singlePost.loading
  };
};

const mapDispatchToProps = {
  getPost: post.getPostById,
  getPosts: post.getPosts,
  sendPost: post.sendPost,
  editPost: post.editPost,
  deletePost: post.deletePost,
  addSection: post.addSection,
  editSection: post.editSection,
  deleteSection: post.deleteSection,
  addNotes: post.addNotes,
  toggleAddNote: post.toggleAddNote,
  editNotes: post.editNotes,
  deleteNotes: post.deleteNotes,
  saveSize: post.saveSize,
  addCreateList: post.addCreateList,
  createList: post.createList,
  editList: post.editList,
  deleteList: post.deleteList,
  toggleEditNote: post.toggleEditNote,
  toggleEditList: post.toggleEditList,
  toggleAddQA: post.toggleAddQA,
  createQA: post.createQA,
  editQA: post.editQA,
  deleteQA: post.deleteQA,
  toggleEditQA: post.toggleEditQA,
  savePos: post.savePos,
  saveSizeBack: post.saveSizeBack,
  savePosBack: post.savePosBack
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
