import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { useSelector } from "react-redux";

import HomeBtn from "./btns/HomeBtn";
import SignUpBtn from "./btns/SignUpBtn";
import SignInBtn from "./btns/SignInBtn";
import LogOutBtn from "./btns/LogOutBtn";
import ToUserDetailBtn from "./btns/ToUserDetailBtn";

const Header = () => {
  const userData = useSelector((state) => state.posts.userData);
  console.log(userData);
  return (
    <Navbar style={{ background: "#F0EBE3" }} expand="lg" sticky="top">
      <Container>
        <HomeBtn />
        <div>
          {userData.userName && (
            <ToUserDetailBtn />
          )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {!userData.userName != "" && (
              <SignUpBtn />
              //로그인이 안되어있으면 회원가입 버튼 생성
            )}

            {!userData.userName == "" ? <LogOutBtn /> : <SignInBtn />}

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
  &:hover {
    color: #7d9d9c;
  }
`;

const PostPreview = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  border: dotted #7d9d9c 0.3rem;
  border-radius: 20px;
  width: fit-content;
  margin: auto 10px;
`;

const UserName = styled.h4`
  display: inline;
  font-weight: bolder;
  color: black;
  margin: 0 5px;
`;

export default Header;
