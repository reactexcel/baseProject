import React from "react";
import styled from "styled-components";
import icon_selection from "../../img/icon-selection.svg";
import CardNote from "../note_card/CardNoteUnresizable";
import CardList from "../list_card/CardList";

const Section = props => {
  return (
    <DIV>
      <div className="section-header-wrapper">
        <div className="left-side">
          <div className="section-name">
            <img
              src={icon_selection}
              alt="icon selection"
              className="selection-icon"
            />
            Selection – Introduction
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
      <div className="header-data">How life imitates Chess</div>
      <div className="main-data">
        <div className="card-wrapper">
          <CardNote technologies={["#Mentality", "#Mentality"]} />
        </div>
        <div className="list-wrapper">
          <CardList technologies={["#Mentality", "#Mentality"]} />
        </div>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  box-shadow: 4px 4px 0 0 #56aeff;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  padding: 24px;
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

  @media screen and (max-width: 1224px) {
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
`;
export default Section;
