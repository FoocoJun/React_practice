import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPostFB,loadPostFB } from "../redux/modules/posts";

import styled from "styled-components";
import SignInBtn from "./btns/SignInBtn";

const AddComment = ({ postId }) => {
  //postId가 필요합니다.
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const commentRef = React.useRef(null);

  const submitToAddComment = (e) => {
    e.preventDefault();
    const commentCard = {
      postId: postId,
      comment: commentRef.current.value,
      date: new Date().toLocaleString(),
      ...userData,
    };
    console.log(commentCard);
    dispatch(commentPostFB(commentCard))
    dispatch(loadPostFB());
    commentRef.current.value=''
  };

  return (
    <>
      {userData && (
        <>
          <hr />
          <CommentBox onSubmit={submitToAddComment}>
            {userData.userName !== "" ? (
              <CommentInput ref={commentRef}></CommentInput>
            ) : (
              <CommentInput ref={commentRef} disabled></CommentInput>
            )}
            {userData.userName !== "" ? (
              <CommentBtn>남기기</CommentBtn>
            ) : (
              <SignInBtn>로그인</SignInBtn>
            )}
          </CommentBox>
          <br />
        </>
      )}
    </>
  );
};

const CommentBox = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
const CommentInput = styled.input`
  width: 80%;
  border-radius: 5px;
`;
const CommentBtn = styled.button`
  border-style: dotted;
  border-width: 3px;
  border-radius: 20px;
  border-color: #7d9d9c;
  background-color: #7d9d9c;
  color: white;
`;

export default AddComment;
