import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ToUserDetailBtn = () => {
  const userData = useSelector((state) => state.posts.userData);
  return (
    <Link
      to={"/user/" + userData.userName}
      style={{
        textDecoration: "none",
      }}
    >
      <UserDetailBtn>
        <Image
          src={userData.userPicture}
          roundedCircle
          width={25}
          height={25}
        />
        <UserName>{userData.userName}</UserName>
      </UserDetailBtn>
    </Link>
  );
};

const UserDetailBtn = styled.div`
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

export default ToUserDetailBtn;
