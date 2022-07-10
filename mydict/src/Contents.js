import React from "react";
import styled from "styled-components";

//Bootstrap
import { Col } from "react-bootstrap";

function Contents({ dict }) {
  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Content>
            {/* 상자가 망가지는 것을 방지하기 위해 글자수로 자름 데이터는 유효 */}
          <div>
            <h4>
              {dict.word.length > 15
                ? dict.word.substring(0, 15) + "..."
                : dict.word}
            </h4>
            <h5>
              {dict.def.length > 30
                ? dict.def.substring(0, 30) + "..."
                : dict.def}
            </h5>
            <h6>
              {dict.ex.length > 30 ? dict.ex.substring(0, 30) + "..." : dict.ex}
            </h6>
          </div>
        </Content>
      </Col>
    </>
  );
}

const Content = styled.div`
  background-color: skyblue;
  border-radius: 5%;
  margin: 5px auto;
  width: 95%;

  &:hover {
    //&은 자기자신을 지칭한다.
    box-shadow: 0px 0px 5px grey;
  }
  div {
    background-color: white;
    margin: auto;
    padding: 1vw;
    width: 98%;
  }
  h6 {
    color: blue;
  }
`;

export default Contents;
