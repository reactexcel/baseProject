import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import ReactQuill from "react-quill";

const EditNoteModal = props => {
  const [richText, setRichText] = useState("");

  useEffect(() => {
    if (props.item && props.item.description) {
      setRichText(props.item.description);
    }
  }, [props.item]);

  const onTextChange = async value => {
    setRichText(value);
    props.quillHandler(value);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide("note-edit")}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>{"Add note"}</Modal.Header>
      <Modal.Body>
        <div className="Form">
          <Formik
            initialValues={{
              title: props.item && props.item.title ? props.item.title : "",
              description:
                props.item && props.item.description
                  ? props.item.description
                  : "",
              url: props.item && props.item.url ? props.item.url : "",
              tags: props.item && props.item.tags ? props.item.tags : "",
              draft: props.item && props.item.draft === 1 ? true : false
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

                  <label>Desc</label>
                  <div>
                    <ReactQuill value={richText} onChange={onTextChange} />
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

export default EditNoteModal;
