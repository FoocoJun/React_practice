import React from "react";
import styled from "styled-components";

//Bootstrap
import { Col } from "react-bootstrap";

function Contents({ dict }) {
  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Content>
          <div>
            <h4>{dict.word}</h4>
            <h5>{dict.def}</h5>
            <h6>{dict.ex}</h6>
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
