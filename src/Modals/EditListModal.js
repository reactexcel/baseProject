import React, { useRef, useState, useEffect } from "react";
import { Formik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { TextArea } from "semantic-ui-react";
import SortableList from "react-sortable-dnd-list";

const EditListModal = props => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (props.item && props.item.listing_items) {
      setListItems(props.item.listing_items);
    }
  }, [props.item]);

  const listItemInput = useRef(null);

  const addListLine = (e, listItemInput) => {
    e.preventDefault();
    let promise = new Promise((res, rej) => {
      let currentValue;
      if (listItemInput.current.ref.current.value.length > 0) {
        currentValue = listItemInput.current.ref.current.value;
        setListItems([
          ...listItems,
          { title: listItemInput.current.ref.current.value }
        ]);

        listItemInput.current.ref.current.value = "";
        res([...listItems, { title: currentValue }]);
      }
    });

    promise.then(res => {
      props.setListItems(res);
    });
  };

  const saveEditList = (values) => {
    props.onSubmit(values, listItems);
  };


  return (
    <Modal
      show={props.show}
      onHide={() => props.onHide("list")}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>{"Edit list"}</Modal.Header>
      <Modal.Body>
        <div className="Form">
          <Formik
            initialValues={{
              title: props.item && props.item.title ? props.item.title : "ssss",
              x: 0,
              y: 0,
              h: 1,
              w: 5,
            }}
            onSubmit={saveEditList}
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
                  <div className="enterLineHolder">
                    <TextArea
                      className="col-12 col-md-12 col-sm-12 col-xs-12"
                      style={{ padding: "0" }}
                      name="item"
                      ref={listItemInput}
                    />
                    <button
                      className="col-12 col-md-12 col-sm-12 col-xs-12"
                      onClick={e => addListLine(e, listItemInput)}
                    >
                      Add
                    </button>
                  </div>
                  <SortableList
                    className="list"
                    itemComponent={ItemComponent}
                    value={listItems}
                    onChange={setListItems}
                  />

                  <button type="submit" onClick={handleSubmit}>
                    Save List
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

function ItemComponent({
  dragging,
  dragged,
  children: { title, description },
  ...rest
}) {
  return (
    <div {...rest} className={`list__item ${dragged ? "is-dragging" : ""}`}>
      <div className="list__item-content">
        <div className="list__item-title">{title}</div>
      </div>
    </div>
  );
}

export default EditListModal;
