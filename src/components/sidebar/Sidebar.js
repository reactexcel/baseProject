import React from "react";
import styled from "styled-components";
import vectors from "../../img/vectors.svg";
import list from "../../img/list.svg";
import operations from "../../img/operations.svg";
import learning from "../../img/learning.svg";
import black_arrow_down from "../../img/black_arrow_down.svg";
const Sidebar = () => {
  return (
    <DIV>
      <h2 className="topic-header">Topics</h2>
      <div className="topics first-topic">
        <ul className="ul">
          <li className="li">
            <img src={vectors} alt="economics icon" className="icon" />
            Economics
          </li>
          <li className="li">
            <img src={list} alt="system icon" className="icon" />
            System design
          </li>
          <li className="li">
            <img src={operations} alt="operations icon" className="icon" />
            Operations Research
          </li>
          <li className="li">
            <img src={learning} alt="machine learning icon" className="icon" />
            Machine learning
          </li>
        </ul>
        <div className="more">
          Show more{" "}
          <img className="more" alt="arrow down" src={black_arrow_down} />
        </div>
      </div>
      <h2 className="topic-header">Whizles</h2>
      <div className="topics first-topic">
        <div className="whizles-item">
          <div className="whizles-img"></div>
          <div className="whizles-info">
            <div className="whizles-header">How Chees imitates life</div>
            <div className="topic-name">Books</div>
          </div>
        </div>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  //**************** general
  width: 100%;
  max-width: 210px;
  margin-right: 20px;
  //************************

  //*******************1-st topic info
  .topic-header {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #ff906d;
    margin-bottom: 20px;
  }

  .topics {
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 20px;
  }

  .ul {
    margin-bottom: 0;
    padding: 0;
  }
  .li {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    list-style-type: none;
    color: #ff906d;
    margin-bottom: 16px;
  }

  .icon {
    margin-right: 12px;
  }

  .more {
    font-size: 12px;
    line-height: 20px;
  }

  .first-topic {
    margin-bottom: 30px;
  }
  //*******************************************

  //*******************2-d topic info
  .whizles-item {
    display: flex;
  }
  .whizles-img {
    width: 54px;
    height: 54px;
    background: grey;
    border-radius: 3px;
    margin-right: 12px;
  }

  .whizles-header {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 4px;
  }

  .topic-name {
    color: #66696e;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
  }

  //*******************************
`;
export default Sidebar;
