import React from "react";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

const AddSectionModal = props => {
  const handleImageChange = e => {
    e.preventDefault();
    props.handleImageChange(e);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide("section")}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>Add Section</Modal.Header>
      <Modal.Body>
        <div className="Form">
          <Formik
            initialValues={{
              title: "",
              description: "",
              image: null,
              tags: ""
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
                    onChange={e => {
                      handleImageChange(e);
                    }}
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
  );
};

export default AddSectionModal;
