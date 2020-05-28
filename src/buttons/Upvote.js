import React from "react";
import like from "../img/like.svg";

const Upvote = props => {
  return (
    <button className="button-upvote" onClick={props.upvoteHandler}>
      <img src={like} alt="like" className="like"/> Upvote
    </button>
  );
};

export default Upvote;