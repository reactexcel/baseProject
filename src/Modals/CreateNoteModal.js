import React from "react";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import ReactQuill from "react-quill";

const CreateNoteModal = props => {
  const onTextChange = value => {
    props.quillHandler(value);
    console.log(value);
  };
  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide("note")}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>{"Add note"}</Modal.Header>
      <Modal.Body>
        <div className="Form">
          <Formik
            initialValues={{
              title: "",
              description: props.richText,
              url: "",
              tags: "",
              draft: false
            }}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required")
            })}
          >
            {props => {
              const {
                values,
                touched,
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

                  {props.post_draft ? (
                    <React.Fragment>
                      <label>Post as a druft?</label>
                      <input
                    name="draft"
                    type="checkbox"
                    onChange={handleChange}
                    value={values.draft}
                  />
                    </React.Fragment>
                  ) : null}

                  <label>Desc</label>
                  <div>
                    <ReactQuill
                      defaultValue={props.richText}
                      onChange={onTextChange}
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
  );
};

export default CreateNoteModal;
