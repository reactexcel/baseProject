import React from "react";
import styled from "styled-components";
import icon_list from "../../img/icon-list.svg";
import pencil from "../../img/pencil.svg";
import share from "../../img/share.svg";
import download from "../../img/download.svg";
import Actions from "../../buttons/Actions/Actions";
import Moment from "react-moment";
import ReactResizeDetector from "react-resize-detector";
const CardList = props => {
  if (!props.item) {
    return (
      <DIV className="cardData">
        <div className="loader" />
      </DIV>
    );
  }


  return (
    <DIV className="cardData">
      <div className="cardHeader">
        <div className="note-data">
          <img className="note" src={icon_list} alt="note" />
          List
        </div>
        {props.edit && <img className="pencil" src={pencil} alt="pencil" />}
        {!props.edit && props.item.created_at && (
          <div className="data-details">
            <Moment fromNow>{props.item.updated_at}</Moment>
          </div>
        )}
      </div>
      <div className="topic-data-header">{props.item.title}</div>
      <div className="topic-data-text">
        <ul className="ul">
          {props.item &&
            props.item.listing_items &&
            props.item.listing_items.map((item, index) => {
              return (
                <li className="li" key={index}>
                  <div className="rectangle"></div>
                  {item.title}
                </li>
              );
            })}
        </ul>
      </div>

      {props.actions ? (
        <div className="buttons-wrapper">
          <button
            className="download"
            onClick={() => props.archiveItemsHandler("list", props.item.id)}
          >
            <img src={download} alt="download" /> Archive
          </button>

          <button
            className="button-share"
            onClick={() => props.shareHandler("list", props.item.id)}
          >
            <img src={share} alt="share" /> Share
          </button>
        </div>
      ) : null}

      {props.technologies ? (
        <div className="technologies">
          <div className="technology-wrapper">
            {props.technologies.map((item, index) => {
              return (
                <div className="technology" key={index}>
                  {`${item} ${" "} dddd`}
                </div>
              );
            })}
          </div>
          {props.action ? (
            <Actions
              saveHandler={props.saveHandler}
              item={props.item}
              type={props.type}
              shareHandler={props.shareHandler}
              editHandler={props.openEditListHandler}
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
    </DIV>
  );
};

const DIV = styled.div`
  padding: 15px 16px 20px 16px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 #61edea;
  width: 316px;
  margin-bottom: 26px;

  .note-data {
    color: #61edea;
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
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

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

  .rectangle {
    background: #61edea;
    border-radius: 1px;
    width: 6px;
    height: 6px;
    display: inline-block;
    margin-right: 16px;
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
  }
`;

export default CardList;
