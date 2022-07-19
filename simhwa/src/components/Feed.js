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

import { useNavigate } from "react-router-dom";

const Feed = ({ card }) => {
  const navigate = useNavigate();
  const postCard = React.useRef();
  const [hover, setHover] = React.useState(false);

  const toDetailPageByClickCard = () => {
    navigate("/detail/" + card.id, { state: { card: card } });
  };

  React.useEffect(() => {
    postCard.current.addEventListener("click", toDetailPageByClickCard);
  });
  return (
    <Container
      ref={postCard}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        border: "dotted #7D9D9C .3rem",
        borderRadius: "20px",
        margin: "3% auto",
        boxShadow: hover ? "0px 0px 5px grey" : "none",
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
          <small> {card.date}</small>
        </div>
        {
          //layout 0인 경우 사진 좌측 글 우측
          //layout 1인 경우 사진 우측 글 좌측
          //layout 2인 경우 사진 하단 글 상단
          card.layout == 0 ? (
            <FeedLayout0 card={card} />
          ) : card.layout == 1 ? (
            <FeedLayout1 card={card} />
          ) : (
            <FeedLayout2 card={card} />
          )
        }
      </Row>
    </Container>
  );
};

const UserName = styled.h4`
  display: inline;
  font-weight: bolder;
  margin: 0 5px;
`;

export default Feed;
