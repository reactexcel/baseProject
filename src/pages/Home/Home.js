import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Main from "./components/Mian";

const Home = props => {
  return (
    <DIV>
        <Header />
        <Main />
    </DIV>
  );
};

const DIV = styled.div`

`;
export default Home;
