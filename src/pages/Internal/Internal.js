import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Main from "./components/Main";

const Internal = props => {
  return (
    <DIV>
      <Header />
      <Main />
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Internal;
