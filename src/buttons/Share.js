import React from "react";
import share from "../img/share.svg";

const Share = props => {
  return (
    <button className="button-share">
      <img src={share} alt="share" /> Share
    </button>
  );
};

export default Share;
