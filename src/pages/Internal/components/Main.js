import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import iconWhizle from "../../../img/icon-whizle.svg";
import * as post from "../../../store/actions/post";
import Moment from "react-moment";
import { postUpvote } from "../../../api/Reactions";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { putNotes } from "../../../api/Notes";
import iconPlus from "../../../img/icon-plus.svg";
import Swal from "sweetalert2";
import { followUserApi, unFollowUserApi } from "../../../api/Follows";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
export const ContextApp = React.createContext();

const Internal = props => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  const [edit, toggleEdit] = useState(false);
  const [postsFormVisible, setPostsFormVisible] = useState(false);
  const [postVal, changePostVal] = useState(0);
  const [secVal, changeSecVal] = useState({
    postId: 0,
    secId: 0
  });

  const [editNote, setEditNote] = useState(null);
  const [notesFormVisible, setNotesFormVisible] = useState(false);
  const [sectionsFormVisible, setSectionsFormVisible] = useState(false);
  const [editedPost, setEditedPost] = useState(0);
  const [file, setFile] = useState();
  const [richText, setRichText] = useState("");

  useEffect(() => {
    props.getPosts();
  }, []);

  const savePost = values => {
    values.image_file = file;
    values.items = [];
    props.sendPost(values);
    setPostsFormVisible(false);
    props.getPosts();
  };

  const editPost = values => {
    values.image_file = file;
    props.editPost(postVal, values, props.post[postVal]);
    setPostsFormVisible(false);
    toggleEdit(false);
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
          promise.then(() => {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your post has been deleted.",
              "success"
            );
            return props.getPosts();
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

  // SECTIONS
  const saveSection = values => {
    values.items = [];
    values.image_file = file;
    props.addSection(editedPost, values);
    setSectionsFormVisible(false);
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

  // NOTES
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

  // LISTS

  const addList = (s, p) => {
    let elem = {};
    elem.type = "list";
    elem.edit = true;
    elem.title = "";
    elem.listing_items = [];
    elem.w = 5;
    elem.h = 400;
    props.addCreateList(p, s, elem);
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

  // QUESTIONS
  const addQA = (s, p) => {
    let elem = {};
    elem.type = "qa";
    elem.edit = true;
    elem.w = 80;
    elem.h = 600;
    elem.question = "";
    props.toggleAddQA(p, s, elem);
  };

  const saveQA = (e, currentQAItems, p, s, i) => {
    let elem = {};
    const formData = new FormData(e.target);
    e.preventDefault();
    for (let entry of formData.entries()) {
      elem[entry[0]] = entry[1];
    }

    elem.type = "qa";
    elem.answers = currentQAItems;

    elem.edit = false;

    let posts_cloned = props.post;
    elem.w = posts_cloned[p].sections[s].questions[i].w;
    elem.h = posts_cloned[p].sections[s].questions[i].h;

    props.post[p].sections[s].questions[i].id !== undefined
      ? props.editQA(p, s, i, elem)
      : props.createQA(p, s, i, elem);
  };

  // OTHER
  const _handleImageChange = e => {
    e.preventDefault();

    let file = e.target.files[0];
    changePostVal(prev => ({ ...prev, file: file }));
    setFile(file);
  };

  const saveSize = (p, s, i, type, h, w) => {
    props.saveSize(p, s, i, type, h, w);
  };
  const saveSizeLayout = (p, s, newItem, h, w) => {
    let i = newItem.i.split("-")[1];
    let type = newItem.i.split("-")[0];
    props.saveSize(p, s, i, type, h, w);
  };

  const savePos = (p, s, newItem, x, y, old) => {
    let i = newItem.i.split("-")[1];
    let type = newItem.i.split("-")[0];
    props.savePos(p, s, i, x, y, type);
  };

  const savePosBack = (p, s, newItem, x, y, old) => {
    let i = newItem.i.split("-")[1];
    let type = newItem.i.split("-")[0];
    props.savePosBack(p, s, i, x, y, type);
  };

  const saveSizeBack = (p, s, newItem, h, w) => {
    let i = newItem.i.split("-")[1];
    let type = newItem.i.split("-")[0];
    props.saveSizeBack(p, s, i, type, h, w);
  };

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

  const postViewHandler = id => {
    props.cleanPost();
    props.history.push(`/post/${id}`);
  };

  return (
    <ContextApp.Provider
      value={{
        saveList,
        saveNote,
        saveQA,
        saveSize,
        savePos,
        saveSizeLayout,
        saveSizeBack,
        savePosBack
      }}
    >
      <DIV>
        <Modal
          show={notesFormVisible}
          onHide={() => setNotesFormVisible(false)}
          dialogClassName="modalForm"
        >
          <Modal.Header closeButton>{"Edite note"}</Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Formik
                initialValues={{
                  title: editNote && editNote.title ? editNote.title : "",
                  description: richText,
                  url: editNote && editNote.url ? editNote.url : "",
                  tags: editNote && editNote.tags ? editNote.tags : "",
                  section_id:
                    editNote && editNote.section_id ? editNote.section_id : "",
                  index: editNote && editNote.index ? editNote.index : null,
                  x: editNote && editNote.x.toString() ? editNote.x : "",
                  y: editNote && editNote.y.toString() ? editNote.y : "",
                  h: editNote && editNote.h.toString() ? editNote.h : "",
                  w: editNote && editNote.w.toString() ? editNote.w : "",
                  id: editNote && editNote.id ? editNote.id : ""
                }}
                onSubmit={saveNote}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Required")
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />

                      <label>Url</label>
                      <input
                        name="url"
                        type="text"
                        value={values.url}
                        onChange={handleChange}
                      />
                      <label>Tags</label>
                      <input
                        type="text"
                        value={values.tags}
                        name="tags"
                        onChange={handleChange}
                      />

                      <label>Desc</label>
                      <div>
                        <ReactQuill
                          value={richText}
                          onChange={value => setRichText(value)}
                        />
                      </div>
                      <button type="submit" onClick={handleSubmit}>
                        Save Note
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>

        {/* Add post */}
        <Modal
          show={postsFormVisible}
          onHide={() => setPostsFormVisible(false)}
          dialogClassName="modalForm"
        >
          <Modal.Header closeButton>
            {edit ? "Edit Post" : "Add Post"}
          </Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Formik
                initialValues={{
                  title:
                    edit && props.post[postVal] && props.post[postVal].title
                      ? props.post[postVal].title
                      : "",
                  description:
                    edit &&
                    props.post[postVal] &&
                    props.post[postVal].description
                      ? props.post[postVal].description
                      : "",
                  image_file: null,
                  tags:
                    edit && props.post[postVal] && props.post[postVal].tags
                      ? props.post[postVal].tags
                      : ""
                }}
                onSubmit={edit ? editPost : savePost}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Required")
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <label>Desc</label>
                      <input
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <label>Thumbnail image</label>
                      <input
                        className="fileInput"
                        name="image_file"
                        type="file"
                        onChange={e => _handleImageChange(e)}
                      />
                      <label>Tags</label>
                      <input
                        type="text"
                        value={values.tags}
                        name="tags"
                        onChange={handleChange}
                      />
                      <button type="submit" onClick={handleSubmit}>
                        Save Post
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={sectionsFormVisible}
          onHide={() => setSectionsFormVisible(false)}
          dialogClassName="modalForm"
        >
          <Modal.Header closeButton>
            {edit ? "Edit Section" : "Add Section"}
          </Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Formik
                initialValues={{
                  title:
                    edit &&
                    props.post[secVal.postId] &&
                    props.post[secVal.postId].sections[secVal.secId] &&
                    props.post[secVal.postId].sections[secVal.secId].title
                      ? props.post[secVal.postId].sections[secVal.secId].title
                      : "",
                  description:
                    edit &&
                    props.post[secVal.postId] &&
                    props.post[secVal.postId].sections[secVal.secId] &&
                    props.post[secVal.postId].sections[secVal.secId].description
                      ? props.post[secVal.postId].sections[secVal.secId]
                          .description
                      : "",
                  image_file: null,
                  tags:
                    edit &&
                    props.post[secVal.postId] &&
                    props.post[secVal.postId].sections[secVal.secId] &&
                    props.post[secVal.postId].sections[secVal.secId].tags
                      ? props.post[secVal.postId].sections[secVal.secId].tags
                      : ""
                }}
                onSubmit={edit ? editSection : saveSection}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Required")
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <label>Desc</label>
                      <input
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <label>Thumbnail image</label>
                      <input
                        className="fileInput"
                        name="image_file"
                        type="file"
                        onChange={e => _handleImageChange(e)}
                      />
                      <label>Tags</label>
                      <input
                        type="text"
                        value={values.tags}
                        name="tags"
                        onChange={handleChange}
                      />
                      <button type="submit" onClick={handleSubmit}>
                        Save Section
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>
        <div className="navigation">
          <div className="nav-item">Whizle</div>
          <div className="nav-item">Activities</div>
        </div>
        <div className="post-button">
          <button
            className="button-add-post"
            onClick={() => setPostsFormVisible(true)}
          >
            <img src={iconPlus} alt="add" /> Add post
          </button>
        </div>
        {props.post.map((post, index) => {
          return (
            <div
              className="main-content"
              key={post.id}
              onClick={() => postViewHandler(post.id)}
            >
              <div className="main-content__header">
                <div className="main-data">
                  <div className="main-data__left-side">
                    <img
                      src={iconWhizle}
                      className="icon-whizle"
                      alt="icon-whizle"
                    />
                    <div className="main-data__left-side_page-name">
                      {post.slug}
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
                            followUnfollowHandler("follow", post.user_id)
                          }
                        >
                          Follow
                        </div>
                        <div
                          className="follow_btn"
                          onClick={() =>
                            followUnfollowHandler("unfollow", post.user_id)
                          }
                        >
                          Unfollow
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="data-details">
                  <Moment fromNow>{post.updated_at}</Moment>
                </div>
              </div>
              <div className="post-details">
                <div className="post-details__name">
                  <div className="post-details__name-header">{post.title}</div>
                  <div className="post-details__name-description">
                    {post.description ? post.description : null}
                  </div>
                </div>
                {post.image ? (
                  <div className="post-logo">
                    <img
                      src={post.image}
                      alt="post image"
                      className="post-image"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </DIV>
    </ContextApp.Provider>
  );
};

const DIV = styled.div`
  width: 100%;
  max-width: 1026px;
  margin-top: 30px;
  margin-bottom: 49px;

  .navigation {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #ffb740;
    margin-bottom: 9px;
    display: flex;
    .nav-item {
      padding: 14px;
      flex: 1;
      text-align: center;
      cursor: pointer;
    }
  }

  .main-content {
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 11px 38px 42px 38px;
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.42) 0px 10px 20px -12px,
        rgba(0, 0, 0, 0.12) 0px 3px 20px 0px,
        rgba(0, 0, 0, 0.2) 0px 8px 10px -5px;
    }
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
    position: fixed;
  }

  .follow_btn {
    cursor: pointer;
  }
`;

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

const mapDispatchToProps = {
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
  savePosBack: post.savePosBack,
  cleanPost: post.cleanPostInfo
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Internal)
);
