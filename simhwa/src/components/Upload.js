import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createPostFB } from "../redux/modules/posts";

//Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

//Font-Awesome
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//firebase
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

//db, storage
import { db, storage, auth } from "../firebase";

//Components
import PreviewPost from "./PreviewPost";

const Upload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //userData
  const userData = useSelector((state) => state.posts.userData);
  const [user, setUser] = React.useState(userData);

  const userEmail = auth.currentUser?.email;
  //로그인 여부 확인
  const AlertToSignIn = () => {
    if (!userEmail || userData.userName == "") {
      alert("로그인 후 작성 가능합니다.");
      navigate("/signin");
    }
  };
  React.useEffect(() => {
    AlertToSignIn();
  });
  //--------------------------------------//

  //image upload
  const [PostUploadImg, setPostUploadImg] = React.useState([]); //이미지 미리보기를 쌓아두는 State
  let newArray = [];
  //layout
  const [layout, setLayout] = React.useState(0);
  //input ref
  const inputLoc = React.useRef("null");
  const inputStory = React.useRef("null");
  //preview state
  const [loc, setLoc] = React.useState("");
  const [story, setStory] = React.useState("");
  const [img, setImg] = React.useState("");

  //--------------------------------------//
  //image file input값이 변한 경우 미리보기 생성
  function onFileChange(e) {
    let array = Array.from(e.target.files);
    let copyPreview = [...array];
    setPostUploadImg(copyPreview);

    //사진의 갯수만큼 URL을 생성 (미리보기까지 storage를 사용할 필요는 없으니까!!)
    //현재 사진 다중등록을 막고있지만 추후 구현을 위해 for문으로 형성
    for (let i = 0; i < array.length; i++) {
      const reader = new FileReader();
      //0. for문 밖에 두었을땐 에러발생
      //DOMException: Failed to execute 'readAsDataURL' on 'FileReader': The object is already busy reading Blobs.
      //각 readAsDataURL 작동마다 새로운 Reader을 제공하니 해결.

      //files를 DataURL로 치환
      reader.readAsDataURL(array[i]);
      //.onload 메서드 : 읽기 동작이 성공적으로 완료되었을 때 발동
      reader.onload = (e) => {
        setImg(e.target.result); //미리보기 이미지 state

        //여러 사진의 DataURL 결과물들을 newArray 변수에 담음
        newArray.push(e.target.result);
      };
    }
  }

  const uploadPost = async (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();

    var tmp_post = {
      writer: user.userName,
      writerPic: user.userPicture,
      writerEmail: user.userEmail,
      date: date,
      layout: layout,
      img: "", //아래에서 추가
      loc: inputLoc.current.value,
      story: inputStory.current.value,
    };

    //참조경로를 만들어주는데
    //storage 안에 "images/" +user.name+ PostUploadImg[0].name +date 라는 이름으로
    const ImagesRef = ref(
      storage,
      `images/${user.userName}:&^@${PostUploadImg[0].name}:&^@${date}`
    );

    //참조경로에 PostUploadImg[0]를 업로드. 완료되면 완료!
    //완료되고 URL을 받아와야 하기 때문에 await
    await uploadBytes(ImagesRef, PostUploadImg[0]).then(() => {
      console.log("Uploaded file!");
    });

    //참조경로 파일의 URL을 받아오기.
    await getDownloadURL(ImagesRef).then((url) => {
      tmp_post.img = url;
      //tmp_post의 img에 url추가
    });
    console.log(tmp_post);
    dispatch(createPostFB(tmp_post));
    navigate("/");
  };

  return (
    <Container
      style={{
        width: "80%",
        margin: "0 auto",
        paddingTop: "40px",
      }}
    >
      <section>
        <form onSubmit={uploadPost}>
          <h3 style={{ fontWeight: "bolder", color: "grey" }}>Layout</h3>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => setLayout(0)}>
              0
            </Button>
            <Button variant="secondary" onClick={() => setLayout(1)}>
              1
            </Button>
            <Button variant="secondary" onClick={() => setLayout(2)}>
              2
            </Button>
          </ButtonGroup>
          <br />
          <br />
          <InputBox>
            <input
              type={"text"}
              ref={inputLoc}
              placeholder={"다녀온 곳을 입력하세요."}
              onChange={() => {
                setLoc(inputLoc.current.value);
              }}
              required
            ></input>
          </InputBox>
          <br />
          <InputBox>
            <input
              type={"file"}
              accept={"image/*"}
              onChange={onFileChange}
              required
            />
          </InputBox>
          <br />
          <InputBox>
            <textarea
              ref={inputStory}
              placeholder={"당신의 이야기를 들려주세요."}
              onChange={() => {
                setStory(inputStory.current.value);
              }}
              required
            ></textarea>
          </InputBox>
          <br />
          {img && story && loc ? (
            <BUTTON type="submit">
              <div className="PlaneBox">
                <div className="PlanePush"></div>
                <div className="Plane">
                  <FontAwesomeIcon icon={faPlane} size={"xl"} color={"white"} />
                </div>
              </div>
            </BUTTON>
          ) : (
            <BUTTON type="submit" disabled>
              <div className="PlaneBox">
              <div className="PlanePush"></div>
                <div className="Plane">
                  <FontAwesomeIcon icon={faPlane} size={"xl"} color={"white"} />
                </div>
              </div>
            </BUTTON>
          )}
        </form>
      </section>

      <hr />

      <section>
        <div>
          <PreviewPost
            loc={loc}
            story={story}
            img={img}
            user={user}
            layout={layout}
          />
        </div>
      </section>
    </Container>
  );
};

const MovingAirPlane = keyframes`
0% {
  width:0px;
}
50% {
  width: 80px;
}

100% {
  width:100px;
}
`;

const BUTTON = styled.button`
  border: solid;
  border-width: 1px;
  border-radius: 10px;
  display: inline-block;
  background-color: #7d9d9c;

  height: 32px;
  width: 128px;
  .PlaneBox {
    display: flex;
    &:hover {
      .PlanePush {
        animation: ${MovingAirPlane} 2s linear;
        animation-fill-mode: forwards;
      }
    }
  }
`;

const InputBox = styled.div`
  input {
    border-style: none none solid;
    border-width: 3px;
    border-color: #7d9d9c;
    background-color: #e4dccf;
    width: 50%;
    min-width: 220px;
  }
  textarea {
    background-color: #e4dccf;
    border-color: #7d9d9c;
    border-width: 3px;
    width: 50%;
    min-width: 220px;
    height: 50%;
    min-height: 370px;
  }
`;

export default Upload;
