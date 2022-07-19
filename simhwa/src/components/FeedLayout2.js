import React from "react";
import styled from "styled-components";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

const FeedLayout2 = ({ card }) => {
  return (
    <>
      <Col md={12}>
        <Stack gap={3}>
          <PostWhere style={{ textAlign: "center" }}>{card.loc}</PostWhere>
          <PostStory style={{ textAlign: "center" }}>
            {card.story.length > 70
              ? card.story.substring(0, 70) + "..."
              : card.story}
          </PostStory>
        </Stack>
      </Col>
      <Col md={12}>
        <div
          style={{
            backgroundColor: "#F0EBE3",
            borderRadius: "20px",
          }}
        >
          <Image
            src={card.img}
            style={{ borderRadius: "20px" }}
            fluid
            width={"200px"}
          />
        </div>
      </Col>
    </>
  );
};

const PostWhere = styled.h3`
  font-weight: bolder;
  text-align: left;
  margin-top: 3%;
`;

const PostStory = styled.h5`
  white-space: pre-wrap;  //줄바꿈 가져오기.
  line-height: 1.2;
  text-align: left;
`;

export default FeedLayout2;
