import React from "react";
import iconPlus from "../img/icon-plus.svg";

const Follow = props => {
  return (
    <button className="button-follow" onClick={props.followHandler}>
      <img src={iconPlus} alt="plus" /> Follow
    </button>
  );
};

export default Follow;
