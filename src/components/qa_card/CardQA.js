import React from "react";
import styled from "styled-components";
import icon_qa from "../../img/icon-qa.svg";
import pencil from "../../img/pencil.svg";
import share from "../../img/share.svg";
import download from "../../img/download.svg";
import question_line_pink from "../../img/question-line-pink.svg";
import Actions from "../../buttons/Actions/Actions";

const CardQA = props => {
  return (
    <DIV className="cardData">
      <div className="cardHeader">
        <div className="note-data">
          <img className="note" src={icon_qa} alt="note" />
          Q&A
        </div>
        {props.actions && <img className="pencil" src={pencil} alt="pencil" />}
      </div>
      <div className="topic-data-header">System optimization tips</div>
      <div className="topic-data-text">
        <ul className="ul">
          {props.item &&
            props.item.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <li className="li">
                    <img
                      src={question_line_pink}
                      alt="icon"
                      className="question"
                    />
                    {item.question}
                  </li>
                  {item.answers.map(item => (
                    <div className="unswer" key={item.id}>
                      {item.answer}
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
        </ul>
      </div>

      {props.actions ? (
        <div className="buttons-wrapper">
          <button className="button-share">
            <img src={share} alt="share" /> Share
          </button>
        </div>
      ) : null}

      {props.action ? (
        <div className="buttons-wrapper">
          <Actions />
        </div>
      ) : null}
    </DIV>
  );
};

const DIV = styled.div`
  padding: 15px 16px 20px 16px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 #ff719b;
  width: 316px;
  margin-bottom: 26px;

  .note-data {
    color: #ff719b;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }

  .note {
    margin-right: 10px;
  }

  .pencil {
    padding: 8.25px;
    border-radius: 50%;
    background-color: #f4f4f4;
    cursor: pointer;

    &:hover {
      box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.42),
        0 3px 20px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    }
  }

  .cardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 11px;
  }

  .frame {
    height: 139px;
    border-radius: 3px;
    background-color: grey;
    margin-bottom: 12px;
  }

  .topic-header {
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
  }

  .topic-data-header {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 13px;
  }

  .topic-data-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 160%;
    margin-bottom: 12px;
    img {
      max-width: 100%;
    }
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .button-share {
      padding: 2px 12px;
      background-color: #ff906d;
      border-radius: 3px;
      color: #fff;
      border: none;

      &:hover {
        background-color: #ff693a;
      }
    }
  }

  .download {
    padding: 2px 12px;
    border-radius: 3px;
    color: #ff906d;
    border: 1px solid #ff906d;
    background-color: #fff;
    &:hover {
      border: 1px solid #ff693a;
      color: #ff693a;
    }
  }

  .ul {
    padding: 0;
  }

  .li {
    list-style-type: none;
  }

  .question {
    display: inline-block;
    margin-right: 8px;
  }

  .unswer {
    margin-top: 6px;
    margin-bottom: 6px;
    text-indent: 1.5em;
    text-align: justify;
    font-size: 12px;
  }
`;

export default CardQA;
