import React from "react";
import styled from "styled-components";
import CardNote from "../note_card/CardNoteUnresizable";
import CardList from "../list_card/CardList";
import iconWhizle from "../../img/icon-whizle.svg";
import { Card } from "react-bootstrap";
import CardQA from "../qa_card/CardQA";

const SectionDetails = props => {
  if (!props.item) {
    return (
      <DIV className="cardData notes">
        <div className="loader" />
      </DIV>
    );
  }

  return (
    <DIV className="section-details-wrapper">
      <div className="section-header-wrapper">
        <div className="left-side">
          <div className="section-name">
            <img
              src={iconWhizle}
              alt="icon selection"
              className="selection-icon"
            />
            {props.item.slug}
          </div>
          <div className="user-data">
            <div className="logo"></div>
            <div className="user">Dwayne Johnson</div>
          </div>
        </div>
        <div className="right-side">
          <div className="posted">Today at 1:32 PM </div>
        </div>
      </div>
      <div className="post-details-section">
        <div className="post-details__name">
          <div className="post-details__name-header">
           {props.item.title}
          </div>
          <div className="post-details__name-description">
            {props.item.description}
          </div>
        </div>
        <div className="post-logo"></div>
      </div>
      <div className="main-data">
        {props.item && props.item.list && props.item.list.length > 0
          ? props.item.list.map(item => {
              return (
                <div className="list-wrapper">
                  <CardList
                    technologies={["#Mentality", "#Mentality"]}
                    action={props.action}
                    item={item}
                  />
                </div>
              );
            })
          : null}

        {props.item && props.item.notes && props.item.notes.length > 0
          ? props.item.notes.map(item => (
              <div className="card-wrapper" key={item.id}>
                <CardNote
                  item={item}
                  technologies={["#Mentality", "#Mentality"]}
                  action={props.action}
                  editHandler={props.editHandler}
                />
              </div>
            ))
          : null}

        {props.item &&
        props.item.questions &&
        props.item.questions.length > 0 ? (
          <div className="qa-card">
            <CardQA
              technologies={["#Mentality", "#Mentality"]}
              action={props.action}
              item={props.item.questions}
            />
          </div>
        ) : null}
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  box-shadow: 4px 4px 0 0 #56aeff;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  padding: 24px;
  width: 100%;

  margin-bottom: 26px;
  .section-header-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
  }
  .selection-icon {
    margin-right: 10px;
  }

  .section-name {
    color: #56aeff;
    font-weight: 500;
    font-size: 12px;
  }

  .logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: grey;
    margin-right: 8px;
  }

  .user {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }

  .posted {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #a7a7a7;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-right: 20px;
  }

  .user-data {
    display: flex;
    align-items: center;
  }

  .header-data {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  .main-data {
    display: flex;
  }

  .main-data:first-child {
    margin-right: 27px !important;
  }

  .card-wrapper {
    margin-right: 27px;
  }

  .post-details__name {
    max-width: 90%;
  }

  .post-details__name-header {
    font-size: 24px;
    line-height: 28px;
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

  .post-details-section {
    display: flex;
    justify-content: space-between;
    padding-bottom: 18px;
    margin-bottom: 18px;
  }

  @media screen and (max-width: 1224px) {
    width: min-content;
    .main-data {
      flex-direction: column;
    }

    .card-wrapper {
      margin-right: 0;
    }

    // .topic-data-text {
    //   max-width: 343px;
    // }

    // .frame {
    //   order: 1;
    //   margin-bottom: 12px;
    // }

    // .right-side {
    //   order: 2;
    // }
  }

  .preview_video {
    width: 100% !important;
    height: 100% !important;
  }
`;
export default SectionDetails;
