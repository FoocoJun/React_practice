import React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

const Feed = ({card}) => {
  let user = {
    name: "Hajun",
    pic: "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/33348141_2029080354019391_8693798106786955264_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZqAAuqEoHEcAX8oicAG&_nc_oc=AQk0omR4N2AcSjVCXiPFh6p1lMLv24xoGErgZ5IrEWh0xF_wJ_ar7O-cN6Fvv0SI5I8&tn=80rR6QnwQZXm_AhZ&_nc_ht=scontent-gmp1-1.xx&oh=00_AT9LHQO7sluY6Fhb9V4dB0PpXAHE7H92Ph29SrprZKEcbw&oe=62F7DB40",
  };

  

  return (
    <Container
      style={{
        width: "80%",
        border: "dotted #7D9D9C .3rem",
        borderRadius: "20px",
        margin: "3% auto",
      }}
    >
      <Row
        className="justify-content-md-center"
        style={{
          margin: "3% auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", margin: "1%" }}>
          <Image src={user.pic} roundedCircle width={32} />
          <UserName>{user.name}</UserName>
          <small style={{}}> {card.date}</small>
        </div>
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
      </Row>
    </Container>
  );
};

const UserName = styled.h6`
  display: inline;
  font-weight: bolder;
  margin: 0 5px;
`;

const PostWhere = styled.h3`
  font-weight: bolder;
  text-align: left;
`;

const PostStory = styled.h6`
  line-height: 1.2;
  text-align: left;
`;

export default Feed;
