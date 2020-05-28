import React, { Component } from "react";
import iconfinder_icon_arrow_up from "../../img/iconfinder_icon-arrow-up.svg";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

class Actions extends Component {
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
    const {type, item} = this.props;
    return (
      <DIV>
        <button className="button-actions relative" onClick={this.handleClick}>
          <img src={iconfinder_icon_arrow_up} alt="plus" /> Actions
        </button>
        <ul className={`ul ${this.state.display ? "active" : "none"}`}>
          <li className="li" onClick={()=>this.props.saveHandler(this.props.item,  this.props.type)}>Save</li>
          <li className="li" onClick={()=>this.props.shareHandler(this.props.item,  this.props.type)}>Share</li>
          <li className="li" onClick={()=>this.props.editHandler(this.props.item, this.props.type)}>Edit</li>
          <li className="li">Copy</li>
          <li className="li" onClick={()=>this.props.createQA(type === 'qa' ? item : null)}>Answer</li>
        </ul>
      </DIV>
    );
  }
}

const DIV = styled.div`
  position: relative;

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

  .ul.active {
    z-index: 1000;
  }
`;

export default onClickOutside(Actions);
