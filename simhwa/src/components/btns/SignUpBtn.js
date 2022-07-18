import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Nav } from "react-bootstrap";

const SignUpBtn = () => {
  return (
    <Nav.Item
      as={Link}
      to={"/signup"}
      style={{
        textDecoration: "none",
      }}
    >
      <LinkBtn>회원가입</LinkBtn>
    </Nav.Item>
  );
};

const LinkBtn = styled.h5`
  color: #576f72;
  margin: 0 15px 0 15px;
  font-size: 1rem;
  font-weight: bolder;
  &: hover {
    color: #7d9d9c;
  }
`;

export default SignUpBtn;
