import React, { Component } from "react";
import iconfinder_icon_arrow_up from "../../img/iconfinder_icon-arrow-up.svg";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

class CreateCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ display: !this.state.display });
  }

  handleClickOutside = () => {
    this.setState({ display: false });
  };

  render() {
    return (
      <DIV>
        <button className="button-actions relative" onClick={this.handleClick}>
          <img src={iconfinder_icon_arrow_up} alt="plus" /> Create cards
        </button>
        <ul className={`ul ${this.state.display ? "" : "none"}`}>
          <li className="li" onClick={()=>this.props.createNote(this.props.item)}>Note</li>
          <li className="li" onClick={()=>this.props.createList(this.props.item)}>List</li>
          <li className="li" onClick={()=>this.props.createQA(/* this.props.item */ null)}>QA</li>
        </ul>
      </DIV>
    );
  }
}

const DIV = styled.div`
  position: relative;
  display: inline-block;
  .ul {
    list-style-type: none;
    position: absolute;
    list-style-type: none;
    right: -8px;
    top: 69px;
    padding: 8px 0 8px 0;
    background-color: white;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    z-index: 3 !important;
    .li {
      color: #ff906d;
      font-size: 14px;
      line-height: 20px;
      &:hover {
        cursor: pointer;
        background: #ff693a;
        color: white;
      }

      padding: 8px 30px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .none {
    display: none;
  }
`;

export default onClickOutside(CreateCards);
