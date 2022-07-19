import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Nav, Navbar } from "react-bootstrap";

import { useSelector } from "react-redux";

import HomeBtn from "./btns/HomeBtn";
import SignUpBtn from "./btns/SignUpBtn";
import SignInBtn from "./btns/SignInBtn";
import LogOutBtn from "./btns/LogOutBtn";

const Header = () => {
  const userData = useSelector((state) => state.posts.userData);
  console.log(userData)
  return (
    <Navbar style={{ background: "#F0EBE3" }} expand="lg" sticky="top">
      <Container>
        <HomeBtn />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {!userData.userName!='' && (
              <SignUpBtn />
              //로그인이 안되어있으면 회원가입 버튼 생성
            )}

            {!userData.userName=='' ? <LogOutBtn /> : <SignInBtn />}

            <Nav.Item
              as={Link}
              to={"/upload"}
              style={{
                textDecoration: "none",
              }}
            >
              <LinkBtn>글쓰기</LinkBtn>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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

export default Header;
