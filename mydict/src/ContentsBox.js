import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Bootstrap
import { Container, Row } from "react-bootstrap";

//Font-Awesome
import {
  faCirclePlus,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Components
import Contents from "./Contents"; //사전 요소

function ContentsBox() {
  const dict = useSelector((state) => state.dict.dict);
  console.log(dict)

  return (
    <>
      <Container>
        <Row>
          {dict.map((val, idx) => {
            return <Contents key={"Contents" + idx} dict={val} />;
          })}
        </Row>
      </Container>

      <AddContents>
        <Link
          to={"/upload"}
          style={{
            textDecoration: "none",
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} size={"3x"} color={"skyBlue"} />
        </Link>
      </AddContents>

      <ScrollTop>
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          size={"3x"}
          color={"skyBlue"}
          onClick={() => window.scrollTo(0, 0)}
        />
      </ScrollTop>
    </>
  );
}

const AddingBtn = keyframes`
0% {
    transform: rotate(0deg)
}
100% {
    transform: rotate(90deg)
}
`;

const noAddingBtn = keyframes`
0% {
    transform: rotate(90deg)
}
100% {
    transform: rotate(0deg)
}
`;

const AddContents = styled.div`
  background-color: white;
  border-radius: 100%;

  position: fixed;
  right: 5%;
  bottom: 5%;
  &:hover {
    animation: ${AddingBtn} 0.1s linear alternate;
  }
  &:not(:hover) {
    animation: ${noAddingBtn} 0.1s linear alternate;
  }
`;

const ScrollTop = styled.div`
  background-color: white;
  border-radius: 100%;

  position: fixed;
  left: 5%;
  bottom: 5%;

  &:hover {
    cursor: pointer;
  }
`;

export default ContentsBox;
