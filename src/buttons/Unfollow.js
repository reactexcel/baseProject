import React from "react";
import iconPlus from "../img/icon-plus.svg";

const Unfollow = props => {
  return (
    <button className="button-unfollow">
      <img src={iconPlus} alt="unfollow" /> Follow
    </button>
  );
};

export default Unfollow;
