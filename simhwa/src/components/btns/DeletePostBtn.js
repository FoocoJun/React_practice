import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deletePostFB } from "../../redux/modules/posts";

const DeletePostBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Params = useParams();

  const DeletePost = async (e) => {
    e.preventDefault();
    dispatch(deletePostFB(Params))
    navigate("/");
  };

  return (
    <DeleteButton onClick={DeletePost} style={{ margin: "0 0 0 20px" }}>
      삭제하기
    </DeleteButton>
  );
};

const DeleteButton = styled.button`
  border-style: dotted;
  border-width: 3px;
  border-radius: 20px;
  border-color: #7d9d9c;
  background-color: #7d9d9c;
  color: white;
`;

export default DeletePostBtn;
