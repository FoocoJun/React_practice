import { doc, getDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useSelector } from "react-redux";

//bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

//Components
import DeletePostBtn from "./btns/DeletePostBtn";
import SpinnerDefault from "./btns/SpinnerDefault";

const PostDetail = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const userData = useSelector((state) => state.users.userData);

  const Params = useParams();
  const [post, setPost] = React.useState({});
  React.useEffect(() => {
    const KeepPostData = async () => {
      const docRef = doc(db, "posts", Params.postId);
      const PostDetailFB = await getDoc(docRef);
      setPost(PostDetailFB.data());
      setIsLoaded(true);
    };
    KeepPostData();
  }, []);
  console.log(post);

  return (
    <>
      <Container
        style={{
          border: "dotted #7D9D9C .3rem",
          borderRadius: "20px",
          margin: "3% auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1%",
          }}
        >
          <Link
            to={"/user/" + post.writer}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
              width: "fit-content",
            }}
          >
            <Image src={post.writerPic} roundedCircle width={50} height={50} />
            <UserName>{post.writer}</UserName>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1%",
              width: "fit-content",
            }}
          >
            <small> {post.date}</small>
            {userData.userEmail == post.writerEmail ||
            userData.userEmail == "songhajun648@gmail.com" ? (
              <DeletePostBtn />
            ) : null}
          </div>
        </div>
        {isLoaded ? (
          <>
            <Image
              src={post.img}
              style={{ borderRadius: "20px", padding: "20px" }}
              fluid
            />
          </>
        ) : (
          <SpinnerDefault />
        )}
        <PostWhere>{post.loc}</PostWhere>
        <PostStory>{post.story}</PostStory>
      </Container>
    </>
  );
};

const PostWhere = styled.h3`
  border: dotted #7d9d9c 0.3rem;
  border-radius: 20px;
  font-weight: bolder;
  margin-top: 3%;
`;
const PostStory = styled.h5`
  border: dotted #7d9d9c 0.3rem;
  border-radius: 20px;
  padding: 20px;
  white-space: pre-wrap;
  line-height: 1.2;
  text-align: left;
`;
const UserName = styled.h4`
  display: inline;
  font-weight: bolder;
  margin: 0 5px;
`;

export default PostDetail;
