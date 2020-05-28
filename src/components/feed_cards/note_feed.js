import React from "react";
import styled from "styled-components";
import icon_note from "../../img/icon-note.svg";
import stare from "../../img/star.svg";
import Moment from "react-moment";
import ReactPlayer from "react-player";

const NoteCard = props => {

  return (
    <DIV className="cardData" key={props.item.id}>
      {props.item && props.item.actor && props.item.object ? (
        <React.Fragment>
          <div className="header-data-wrapper">
            <div className="cardHeader">
              <div className="note-data">
                <img className="note" src={icon_note} alt="note" />
                Note
              </div>
              <div className="user-data">
                <div className="logo">
                  {props.item.actor.avatar && (
                    <img
                      src={props.item.actor.avatar}
                      alt="logo"
                      className="logo"
                    />
                  )}
                </div>
                <div className="author">{props.item.actor.name}</div>
              </div>
            </div>

            {props.item.object.created_at && (
              <div className="when">
                <Moment fromNow>{props.item.object.created_at}</Moment>
              </div>
            )}
          </div>
          <div className="main-content">
            <div className="right-side">
              <div className="topic-data-header">{props.item.object.title}</div>
              <div
                className="topic-data-text"
                dangerouslySetInnerHTML={{
                  __html: props.item.object.description
                }}
              />
              <div className="buttons-wrapper">
                <button className="butoon" onClick={()=> {props.saveHandler(props.item.object.id, "note")}}>
                  <img src={stare} alt="share"  /> Save
                </button>

                {props.item.object.tags && (
                  <div className="technologies">
                    {props.item.object.tags.split(",").map((item, index) => (
                      <div className="technology" key={index}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {props.item.object &&
              props.item.object.url &&
              props.item.object.url.indexOf("youtube.com") >= 0 && (
                <div className="frame">
                  <ReactPlayer
                    className="preview_video"
                    url={props.item.object.url}
                    playing={false}
                  />
                </div>
              )}
          </div>
        </React.Fragment>
      ) : (
        <div className="loader" />
      )}
    </DIV>
  );
};

const DIV = styled.div`
  padding: 15px 16px 20px 16px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 #ffb740;
  margin-bottom: 26px;

  .main-content {
    display: flex;
    justify-content: space-between;
  }
  .right-side {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
  }
  .note-data {
    color: #ffb740;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    margin-right: 10px;
  }

  .note {
    margin-right: 10px;
  }

  .cardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    max-width: 300px;
    flex-wrap: wrap;
    width: 100%;
  }

  .header-data-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .frame {
    width: 307px;
    height: 201px;
    border-radius: 3px;
    background-color: grey;
    min-width: 307px;
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
    height: 100%;
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;

    .butoon {
      padding: 2px 12px;
      background-color: #ff906d;
      border-radius: 3px;
      color: #fff;
      border: none;
      margin-right: 20px;

      &:hover {
        background-color: #ff693a;
      }
    }
  }

  .logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: grey;
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }

  .author {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    margin-right: 10px;
  }

  .when {
    color: #a7a7a7;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    width: max-content;
    white-space: nowrap;
  }

  .user-data {
    display: flex;
    align-items: center;
  }

  .technology {
    color: #a7a7a7;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    margin-right: 8px;
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
  }

  .more {
    color: #ff906d;
  }

  @media screen and (max-width: 1224px) {
    .main-content {
      flex-wrap: wrap;
      flex-direction: reverse;
    }

    .topic-data-text {
      max-width: 343px;
    }

    .frame {
      order: 1;
      margin-bottom: 12px;
    }

    .right-side {
      order: 2;
    }
  }

  .preview_video {
    width: 100% !important;
    height: 100% !important;
  }


`;

export default NoteCard;
