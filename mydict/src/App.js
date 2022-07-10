import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import ContentsBox from "./ContentsBox"; //사전 정리하는 박스
import Upload from "./Upload"; //사전 추가하는 창

function App() {
  return (
    <div className="App">
      <Header>
        <h2>F-16 MPM BREVITY WORDS</h2>
        <hr />
      </Header>
      <Routes>
        <Route path="/" element={<ContentsBox />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

const Header = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bolder;
    margin-top: 35px;
    text-align: center;
  }
  hr {
    border-style: dotted;
    margin: 20px auto;
    width: 80%;
  }
`;

export default App;
