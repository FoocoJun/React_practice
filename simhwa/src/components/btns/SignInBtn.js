import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Nav } from "react-bootstrap";

const SignInBtn = ({setIsLogOut}) => {
  return (
    <Nav.Item
      as={Link}
      to={"/signin"}
      style={{
        textDecoration: "none",
      }}
      //로그인 구현 전 예시
      onClick={()=>{setIsLogOut(false)}}
    >
      <LinkBtn>로그인</LinkBtn>
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

export default SignInBtn;
