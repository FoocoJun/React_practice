import React from "react";
import { useParams } from "react-router-dom";
import Typed from "react-typed";

//Components
import LogOutBtn from "./btns/LogOutBtn";

const UserDetail = () => {
  const UserParams = useParams();
  console.log(UserParams);

  const textLines = [
    UserParams.userName + "님의 페이지 입니다.",
    "기능 준비중 입니다.",
  ];

  return (
    <>
      <div style={{ fontSize: "24px", fontFamily: "Roboto Mono" }}>
        <Typed strings={textLines} typeSpeed={50}  backSpeed={50} loop={true}/>
      </div>
      <br/>
      <LogOutBtn />
    </>
  );
};

export default UserDetail;
