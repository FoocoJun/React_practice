import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Nav } from "react-bootstrap";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const LogOutBtn = () => {
  const logout = () => {
    signOut(auth).then(() => {});
  };

  return (
    <Nav.Item
      as={Link}
      to={"/"}
      style={{
        textDecoration: "none",
      }}
    >
      <LinkBtn onClick={logout}>로그아웃</LinkBtn>
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

export default LogOutBtn;
