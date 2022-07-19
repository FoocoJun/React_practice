import React from "react";
import { useLocation, useParams } from "react-router-dom";

const PostDetail = () => {
    const card = useLocation();
    const DetailParams = useParams()
    console.log(DetailParams)
  return <div>게시물</div>;
};

export default PostDetail;
