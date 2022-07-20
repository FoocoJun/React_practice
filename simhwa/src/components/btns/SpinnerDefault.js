import React from "react";

import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const SpinnerDefault = () => {

  return (
    <SpinnerCont>
      <Spinner animation="border" variant="info"/>
    </SpinnerCont>
  );
};

const SpinnerCont = styled.div`
  display: grid;    //개꿀...
  justify-content: center;
  align-items: center;
  height: 350px;
`;

export default SpinnerDefault;
