import React from "react";

import { useSelector } from "react-redux";

//Components
import Feed from "./Feed";
import ScrollTopBtn from "./btns/ScrollTopBtn";

const FeedBox = () => {
  const post = useSelector((state) => state.posts.post);

  return (
    <>
      {post.map((card, idx) => {
        return (
            <Feed key={"Feed" + idx} card={card} />
        );
      })}

      <ScrollTopBtn />
    </>
  );
};

export default FeedBox;
