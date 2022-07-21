import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SignInBtn from "./btns/SignInBtn";

const CommentBox = ({ comments }) => {
  const [showMore, setShowMore] = React.useState(0);
  const update = useSelector((state) => state.posts.isUpdated);
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    setV(update);
  }, [update]);
  React.useEffect(() => {
    
  }, [v]);

  const toShowMore = (e) => {
    e.preventDefault();
    setShowMore(showMore + 1);
  };

  let filteredComments = comments.filter((val, idx) => idx < 2 ** showMore);

  //comments가 필요합니다.
  return (
    <>
      <hr />

      {filteredComments.map((val, idx) => {
        return (
          <div key={"CommentContainer" + idx}>
            <CommentContainer>
              <CommentBar>
                {comments[idx].comment}
                <span>{comments[idx].date}</span>
              </CommentBar>
              <Btn
                onClick={(e) => {
                  alert("신고되었습니다. 밥먹고 와서 지우든 하겠습니다.");
                  e.preventDefault();
                }}
              >
                신고
              </Btn>
            </CommentContainer>
          </div>
        );
      })}
      {!(2 ** showMore >= comments.length) && (
        <ShowMoreBtn onClick={toShowMore}>더보기</ShowMoreBtn>
      )}
    </>
  );
};

const CommentContainer = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 2px 0;
  flex-wrap: wrap;
`;

const CommentBar = styled.span`
  text-align: left;
  display: flex;
  width: 80%;
  border-radius: 5px;
  justify-content: space-between;
`;

const Btn = styled.button`
  border-style: none;
  border-width: 3px;
  border-radius: 20px;
  background-color: orange;
  color: black;
`;

const ShowMoreBtn = styled.button`
  border-style: none;
  border-width: 3px;
  border-radius: 20px;
  background-color: grey;
  color: white;
`;

export default CommentBox;
