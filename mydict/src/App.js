import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDictFB } from "./redux/modules/dict";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import ContentsBox from "./ContentsBox"; //사전 정리하는 박스
import Upload from "./Upload"; //사전 추가하는 창
import { Spinner } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.dict.is_loaded);

  React.useEffect(() => {
    dispatch(loadDictFB());
  }, []);

  return (
    <div className="App">
      <Header>
        <h2>AirCombat BREVITY WORDS</h2>
        <hr />
      </Header>
      {!is_loaded && (
        <SpinnerCont>
          <Spinner
            animation="border"
            variant="info"
            style={{
              display: "block",
              position: "fixed",
              top: "50%",
              right: "50%",
            }}
          />
        </SpinnerCont>
      )}
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

const SpinnerCont = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export default App;
