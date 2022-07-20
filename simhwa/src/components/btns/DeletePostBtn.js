import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DeletePostBtn = () => {
  const navigate = useNavigate();
  const DeletePost = async (e) => {
    e.preventDefault();
    const Params = useParams();
    const docRef = doc(db, "posts", Params.postId);
    await deleteDoc(docRef);
    navigate("/");
  };

  return (
    <button onClick={DeletePost} style={{ margin: "0 0 0 20px" }} disabled>
      삭제하기
    </button>
  );
};

export default DeletePostBtn;
