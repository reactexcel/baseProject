import React from "react";
import pencil from "../img/pencil_white.svg";

const Upvote = props => {
  return (
    <button className="button-edit" onClick={()=>props.edit(props.num)}>
      <img src={pencil} alt="pencil" className="pencil"/> Edit
    </button>
  );
};

export default Upvote;
