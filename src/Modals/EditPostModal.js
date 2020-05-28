import React from "react";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

const EditPostModal = props => {
  const handleImageChange = e => {
    e.preventDefault();
    props.handleImageChange(e)
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide("post")}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>{props.edit ? "Edit Post" : "Add Post"}</Modal.Header>
      <Modal.Body>
        <div className="Form">
          <Formik
            initialValues={{
              title:
                props.edit && props.post && props.post.title
                  ? props.post.title
                  : "",
              description:
                props.edit && props.post && props.post.description
                  ? props.post.description
                  : "",
              image_file: null,
              tags: props.edit && props.post && props.post.tags ? props.post.tags : ""
            }}
            onSubmit={props.edit ? props.editPost : props.savePost}
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
                    onChange={handleImageChange}
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
  );
};

export default EditPostModal;
