import React, { useState, useContext, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { Editor, EditorState, RichUtils } from "draft-js";
import RichEditor from "../components/editor";
import "draft-js/dist/Draft.css";

const AddQA = (props) => {
  const [question, setQueastion] = useState("");
  const [answers, setAnswers] = useState([{ type: "answer", value: "" }]);
  const questionHandler = (e) => {
    setQueastion(e.target.value);
  };

  const editCurrentQAItem = (value, i) => {
    const copy = answers.slice();
    copy[i] = { type: "answer", value };
    setAnswers(copy);
  };

  const addCurrentQAItem = (e) => {
    e.preventDefault();
    let answersArray = [...answers, { type: "answer", value: "" }];
    setAnswers(answersArray);
  };

  const saveQA = (e) => {
    e.preventDefault();
    const data = {
      question,
      answers,
    };
    props.saveQA(e, data);
  };

  const { data } = props;
  useEffect(() => {
    if (data) {
      setQueastion(data.question);
    } else {
      setQueastion("");
    }
  }, [data]);

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide("qa");
      }}
      dialogClassName="modalForm"
    >
      <Modal.Header closeButton>
        {data ? "Add Answer To The Question" : "Add question"}
      </Modal.Header>
      <div className="QAForm">
        <form
          onSubmit={(e) => {
            if (data) {
              props.handleSaveAnswerTdQues(e, answers, data.id);
            } else {
              saveQA(e);
            }
          }}
        >
          <label>Question</label>
          <input
            type="text"
            disabled={data ? true : false}
            name="title"
            value={question}
            // defaultValue={question}
            onChange={questionHandler}
          />

          {answers.map((item, index) => {
            return (
              <div
                key={index}
                className="react-q-wrapper"
                style={{ marginBottom: "50px" }}
              >
                {data ? (
                  <RichEditor 
                    onChange = {editCurrentQAItem}
                    index = {index}
                  />
                ) : (
                  <ReactQuill
                    value={item.value}
                    onChange={(value) => editCurrentQAItem(value, index)}
                  />
                )}
              </div>
            );
          })}
          <button onClick={addCurrentQAItem} style={{ marginTop: "53px" }}>
            +add answer
          </button>
          <button type="submit">Send</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddQA;
