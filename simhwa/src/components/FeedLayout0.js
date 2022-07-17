import React from "react";
import styled from "styled-components";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

const FeedLayout0 = ({card}) => {
  return (
    <>
      <Col md={6}>
        <Image src={card.img} style={{ borderRadius: "20px" }} fluid />
      </Col>
      <Col md={6}>
        <Stack gap={3}>
          <PostWhere>{card.loc}</PostWhere>
          <PostStory>
            {card.story.length > 50
              ? card.story.substring(0, 50) + "..."
              : card.story}
          </PostStory>
        </Stack>
      </Col>
    </>
  );
};

const PostWhere = styled.h3`
  font-weight: bolder;
  text-align: left;
  margin-top: 3%;
`;

const PostStory = styled.h6`
  line-height: 1.2;
  text-align: left;
`;

export default FeedLayout0;
