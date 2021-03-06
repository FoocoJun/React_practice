import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

import { useDispatch } from "react-redux";
import { awayUserDataFB } from "../../redux/modules/users";

//bootstrap
import { Nav } from "react-bootstrap";

const LogOutBtn = () => {
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth).then(() => {});
    dispatch(awayUserDataFB())
    
  };

  return (
    <Nav.Item
      as={Link}
      to={"/"}
      style={{
        textDecoration: "none",
      }}
    >
      <LinkBtn onClick={logout}>๋ก๊ทธ์์</LinkBtn>
    </Nav.Item>
  );
};

const LinkBtn = styled.h5`
  color: #576f72;
  margin: 0 15px 0 15px;
  font-size: 1rem;
  font-weight: bolder;
  &:hover {
    color: #7d9d9c;
  }
`;

export default LogOutBtn;
