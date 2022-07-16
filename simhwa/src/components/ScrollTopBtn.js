import React from "react";
import styled from "styled-components";

//Font-Awesome
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollTopBtn = () => {
  return (
    <>
      <ScrollTop>
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          size={"3x"}
          color={"#7D9D9C"}
          onClick={() => window.scrollTo(0, 0)}
        />
      </ScrollTop>
    </>
  );
};

const ScrollTop = styled.div`
  background-color: #F0EBE3;
  border-radius: 100%;

  position: fixed;
  left: 5%;
  bottom: 5%;

  &:hover {
    cursor: pointer;
  }
`;

export default ScrollTopBtn;
