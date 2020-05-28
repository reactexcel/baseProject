import React from "react";
import iconPlus from "../img/icon-plus.svg";

const AddSection = props => {
  return (
    <button className="button-add-section" onClick={()=>props.addSectionHandler(props.num)}>
      <img src={iconPlus} alt="plus" /> Add section
    </button>
  );
};

export default AddSection;
