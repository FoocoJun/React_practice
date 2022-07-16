import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Nav, Navbar } from "react-bootstrap";

import HomeBtn from "./HomeBtn";

const Header = () => {
  var isLogined = true;
  return (
    <Navbar style={{background:"#F0EBE3"}} expand="lg" sticky="top">
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
            {isLogined && ( //로그인이 되어있으면 회원가입이 필요없음.
              //Nav.Link 사용시 herf이용으로 간편하지만 Route가 아닌 페이지 이동이 일어남.(화면 깜빡임 -> React 쓰는 이유가 없어짐)
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
            )}

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
  color: #576F72;
  margin: 0 15px 0 15px;
  font-size: 1rem;
  font-weight: bolder;
  &: hover {
    color: #7D9D9C;
  }
`;

export default Header;
