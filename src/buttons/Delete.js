import React from "react";
import like from "../img/like.svg";

const Delete = props => {
  return (
    <button className="button" onClick={props.deleteHandler}>
      Delete post
    </button>
  );
};

export default Delete;