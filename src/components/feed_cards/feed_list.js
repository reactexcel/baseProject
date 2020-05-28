import React from "react";
import styled from "styled-components";
import icon_list from "../../img/icon-list.svg";
import Moment from "react-moment";
import stare from "../../img/star.svg";

const FeedList = props => {
  if (!props.item) {
    return (
      <DIV className="cardData">
        <div className="loader" />
      </DIV>
    );
  }

  return (
    <DIV className="cardData"  key={props.item.id}>
      <div className="header-data-wrapper">
        <div className="cardHeader">
          <div className="list-data">
            <img className="list" src={icon_list} alt="list" />
            List
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
      <div className="topic-data-header">{props.item.object.title}</div>
      <div className="topic-data-text">
        <ul className="ul">
          {props.item &&
            props.item.object.listing_items &&
            props.item.object.listing_items.map((item, index) => {
              return (
                <li className="li" key={index}>
                  <div className="rectangle"></div>
                  {item.title}
                </li>
              );
            })}
        </ul>
      </div>

      <div className="buttons-wrapper">
        <button className="butoon" onClick={()=> props.saveHandler(props.item.object.id, "list")}>
          <img src={stare} alt="share" /> Save
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
    </DIV>
  );
};

const DIV = styled.div`
  padding: 15px 16px 20px 16px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 #61edea;
  margin-bottom: 26px;

  .header-data-wrapper {
    display: flex;
    justify-content: space-between;
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

  .list-data {
    color: #142948;
    font-weight: 500;
    font-size: 14px;
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

  .logo {
    width: 20px;
    height: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: grey;
    margin-right: 8px;
  }

  .list {
    margin-right: 10px;
  }
  .user-data {
    display: flex;
    align-items: center;
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

  button {
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
`;

export default FeedList;
