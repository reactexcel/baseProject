import React from "react";
import styled from "styled-components";
import icon_note from "../../img/icon-note.svg";
import pencil from "../../img/pencil.svg";
import Share from "../../buttons/Share";
import Actions from "../../buttons/Actions/Actions";
import ReactPlayer from "react-player";
import Moment from "react-moment";
import ReactResizeDetector from "react-resize-detector";
import { Link } from "react-router-dom";

const CardNote = props => {
  const changeSizeApi = () => {
    const data = {
      section_id: props.item.section_id,
      title: props.item.title,
      description: props.item.description,
      url: props.item.url,
      tags: props.item.tags,
      index: props.item.index,
      index: props.index
    };

    props.getIndex(data);
  };

  if (!props.item) {
    return (
      <DIV className="cardData notes">
        <div className="loader" />
      </DIV>
    );
  }

  return (
    <DIV
      className="cardData notes react-grid-item"
      id={`${props.className}`}
      key={`notes-${props.index}`}
      onClick={() => changeSizeApi(props.item.index)}
    >
      <div className="cardHeader">
        <div className="note-data">
          <img className="note" src={icon_note} alt="note" />
          Note
        </div>
        {props.edit && <img className="pencil" src={pencil} alt="pencil" />}
        {!props.edit && props.item && props.item.created_at && (
          <div className="data-details">
            <Moment fromNow>{props.item && props.item.updated_at}</Moment>
          </div>
        )}
      </div>
      {props.item &&
        props.item.url &&
        props.item.url.indexOf("youtube.com") >= 0 && (
          <div className="frame">
            <ReactPlayer
              className="preview_video"
              url={props.item.url}
              playing={false}
            />
          </div>
        )}

      <div className="topic-data-header">
        {props.item && props.item.title ? props.item.title : ""}
      </div>
      <div
        className="topic-data-text"
        style={{ overflowWrap: "break-word" }}
        dangerouslySetInnerHTML={{ __html: props.item.description }}
      />

      {!!props.actions ? (
        <div className="buttons-wrapper">
          {" "}
          <Share />{" "}
        </div>
      ) : null}

      {!!props.action ? (
        <div className="technologies">
          <div className="technology-wrapper">
            {props.item.tags &&
              props.item.tags.split(",").map((item, index) => {
                return (
                  <div className="technology" key={index}>
                    <pre
                      className="technology-item"
                      key={index}
                    >{`#${item} `}</pre>
                  </div>
                );
              })}
          </div>
          {!!props.action ? (
            <Actions item={props.item} 
            saveHandler={props.saveHandler}
            editHandler={props.editHandler} 
            type={props.type}
            shareHandler={props.shareHandler}
            editHandler={props.openEditNoteHandler}
            />
          ) : (
            ""
          )}
        </div>
      ) : null}
      <ReactResizeDetector
        className="Resize-detector"
        handleWidth
        handleHeight
      />
      <Link to={`/card/note/${props.item.id}`} >View All</Link>
    </DIV>
  );
};

const DIV = styled.div`
  padding: 15px 16px 20px 16px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 #ffb740;
  width: 316px;
  margin-bottom: 26px;

  .note-data {
    color: #ffb740;
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
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    .butoon {
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

  .technologies {
    font-size: 12px;
    line-height: 20px;
    color: #a7a7a7;
    display: flex;

    justify-content: space-between;
  }

  .technology-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-right: 10px;
  }

  .technology-item {
    font-size: 12px;
    line-height: 20px;
    color: #a7a7a7;
  }

  .data-details {
    font-size: 12px;
    color: #a7a7a7;
  }

  .preview_video {
    width: auto !important;
    height: auto !important;
  }
`;

export default CardNote;
