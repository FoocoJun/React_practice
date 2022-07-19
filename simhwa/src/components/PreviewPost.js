import React from "react";
import styled from "styled-components";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

//Components
import FeedLayout0 from "./FeedLayout0";
import FeedLayout1 from "./FeedLayout1";
import FeedLayout2 from "./FeedLayout2";

const PreviewPost = (props) => {
  const date = new Date().toLocaleString();

  const card = {
    writer: props.user.userName,
    writerPic: props.user.userPicture,
    date: date,
    layout: props.layout,
    img: props.img,
    loc: props.loc,
    story: props.story,
  };

  // console.log(card);
  return (
    <>
      <Container
        style={{
          border: "dotted #7D9D9C .3rem",
          borderRadius: "20px",
          margin: "3% auto",
        }}
      >
        <Row
          className="justify-content-md-center"
          style={{
            margin: "1.5% auto 3%",
          }}
        >
          {/* 유저 정보와 게시글 작성 시간 */}
          <div style={{ display: "flex", alignItems: "center", margin: "1%" }}>
            <Image src={card.writerPic} roundedCircle width={50} height={50} />
            <UserName>{card.writer}</UserName>
            <small> {card.date.split('GMT')[0]}</small>
          </div>
          {
            //layout 0인 경우 사진 좌측 글 우측
            //layout 1인 경우 사진 우측 글 좌측
            //layout 2인 경우 사진 하단 글 상단
            card.layout === 0 ? (
              <FeedLayout0 card={card} />
            ) : card.layout === 1 ? (
              <FeedLayout1 card={card} />
            ) : (
              <FeedLayout2 card={card} />
            )
          }
        </Row>
      </Container>
    </>
  );
};

const UserName = styled.h4`
  display: inline;
  font-weight: bolder;
  margin: 0 5px;
`;

export default PreviewPost;
