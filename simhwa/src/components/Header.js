import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Nav, Navbar } from "react-bootstrap";

import HomeBtn from "./HomeBtn";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
          }}
        >
          <HomeBtn />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link
                to={"/signup"}
                style={{
                  textDecoration: "none",
                }}
              >
                <LinkBtn>회원가입</LinkBtn>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to={"/signin"}
                style={{
                  textDecoration: "none",
                }}
              >
                <LinkBtn>로그인</LinkBtn>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to={"/upload"}
                style={{
                  textDecoration: "none",
                }}
              >
                <LinkBtn>글쓰기</LinkBtn>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const LinkBtn = styled.h5`
  color: black;
  margin: 0 15px 0 15px;
  font-size: 1rem;
  font-weight: bolder;
  &: hover {
    color: skyblue;
  }
`;

export default Header;
