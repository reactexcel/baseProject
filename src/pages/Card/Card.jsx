import React, { Component } from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import { connect } from "react-redux";
import * as post from "../../store/actions/post";
import ReactPlayer from "react-player";
import pencil from "../../img/pencil.svg";
import icon_qa from "../../img/icon-qa.svg";
import icon_list from "../../img/icon-list.svg";
import icon_note from "../../img/icon-note.svg";
import Moment from "react-moment";

function Card(props) {
  React.useEffect(() => {
    props.getCard({
      type: props.match.params.cardType,
      id: props.match.params.cardId,
    });
  }, [props.match.params.cardId]);
  const type = props.match.params.cardType;

  let content = "",
    title = "";
  if (props.card) {
    switch (type) {
      case "note":
        title = props.card.title;
        content = (
          <div>
            <div className="cardHeader">
              <div className="note-data">
                <img className="note" src={icon_note} alt="note" />
                Note
              </div>
              <div className="data-details">
                <Moment fromNow>{props.card && props.card.updated_at}</Moment>
              </div>
            </div>
            {props.card &&
              props.card.url &&
              props.card.url.indexOf("youtube.com") >= 0 && (
                <div className="frame">
                  <ReactPlayer
                    className="preview_video"
                    url={props.card.url}
                    playing={false}
                  />
                </div>
              )}

            <div className="topic-data-header">
              {props.card && props.card.title ? props.card.title : ""}
            </div>
            <div
              className="topic-data-text"
              style={{ overflowWrap: "break-word" }}
              dangerouslySetInnerHTML={{ __html: props.card.description }}
            />
          </div>
        );

        break;
      case "QA":
        title = props.card.question;
        content = (
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className="note-data">
                <img className="note" src={icon_qa} alt="QA" />
                Q&A
              </div>
              <Moment fromNow>{props.card.updated_at}</Moment>
            </div>
            {props.card &&
              props.card.url &&
              (props.card.url.indexOf("youtube.com") >= 0 ||
                props.card.url.indexOf("youtu.be") >= 0) && (
                <div className="frame">
                  <ReactPlayer
                    className="preview_video"
                    url={props.card.url}
                    playing={false}
                  />
                </div>
              )}
            <div className="topic-data-header">{props.card.question}</div>
            <div className="topic-data-text">
              {props.card && props.card.answers
                ? props.card.answers.map((card) => {
                    return (
                      <div
                        className="li"
                        key={card.answer}
                        style={{ overflowWrap: "break-word" }}
                        dangerouslySetInnerHTML={{
                          __html: card.answer ? card.answer : "",
                        }}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        );
        break;
      case "list":
        title = props.card.title;
        content = (
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className="note-data">
                <img className="note" src={icon_list} alt="list" />
                List
              </div>
              <div className="data-details">
                <Moment fromNow>{props.card.updated_at}</Moment>
              </div>
            </div>
            {props.card &&
              props.card.url &&
              (props.card.url.indexOf("youtube.com") >= 0 ||
                props.card.url.indexOf("youtu.be") >= 0) && (
                <div className="frame">
                  <ReactPlayer
                    className="preview_video"
                    url={props.card.url}
                    playing={false}
                  />
                </div>
              )}
            <div className="topic-data-text">
              <ul className="ul">
                {props.card &&
                  props.card.listing_cards &&
                  props.card.listing_cards.map((item, index) => {
                    return (
                      <li className="li" key={index}>
                        <div className="rectangle"></div>
                        {item.title}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        );
        break;
    }
  }
  return (
    <DIV>
      <Header />
      {!props.card ? (
        <div className="loader"></div>
      ) : (
        <div className="container">
          <div className="my-3 d-flex justify-content-between">
            <div className="main-data__left-side">{title}</div>
            <div className="main-data__right-side align-items-center">
              <div className="main-data__right-side_logo"></div>
              <div className="user-details">
                <div className="main-data__right-side_name">Dwayne Johnson</div>
              </div>
            </div>
          </div>
          <div className="data-details">{content}</div>
        </div>
      )}
    </DIV>
  );
}

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

  props.card-details__name {
    max-width: 90%;
  }

  props.card-details__name-header {
    font-size: 32px;
    line-height: 35px;
  }

  props.card-details__name-description {
    font-size: 16px;
  }

  props.card-logo {
    width: 54px;
    height: 54px;
    border-radius: 3px;
    background-color: grey;
  }

  props.card-details {
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

  props.card-image {
    width: 54px;
    height: 54px;
  }

  props.card-button {
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

const mapStateToProps = (state) => {
  return {
    card: state.singleCard.card,
    loading: state.singleCard.loading,
  };
};

const mapDispatchToProps = {
  getCard: post.getCardById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
