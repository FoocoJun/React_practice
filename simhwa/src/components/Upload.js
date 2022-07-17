import React from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

//firebase
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

//db, storage
import { storage } from "../firebase";
import styled from "styled-components";

//Components
import PreviewPost from "./PreviewPost";

const Upload = () => {
  //로그인 구현 전 임시 회원정보
  const user = {
    name: "Hajun",
    pic: "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/33348141_2029080354019391_8693798106786955264_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZqAAuqEoHEcAX8oicAG&_nc_oc=AQk0omR4N2AcSjVCXiPFh6p1lMLv24xoGErgZ5IrEWh0xF_wJ_ar7O-cN6Fvv0SI5I8&tn=80rR6QnwQZXm_AhZ&_nc_ht=scontent-gmp1-1.xx&oh=00_AT9LHQO7sluY6Fhb9V4dB0PpXAHE7H92Ph29SrprZKEcbw&oe=62F7DB40",
  };

  //image upload
  const [preview, setPreview] = React.useState([]); //이미지 미리보기를 쌓아두는 State
  let newArray = [];
  //layout
  const [layout, setLayout] = React.useState(0);
  //input ref
  const inputLoc = React.useRef("null");
  const inputImg = React.useRef("null");
  const inputStory = React.useRef("null");
  //preview state
  const [loc, setLoc] = React.useState("");
  const [story, setStory] = React.useState("");
  const [img, setImg] = React.useState("");  

  //loc input값이 변한 경우 미리보기 생성
  const onLocChange = () => {
    setLoc(inputLoc.current.value);
  };

  //story input값이 변한 경우 미리보기 생성
  const onStoryChange = () => {
    setStory(inputStory.current.value);
  };

  //image input값이 변한 경우 미리보기 생성
  function onFileChange(e) {
    let array = Array.from(e.target.files);
    let copyPreview = [...array];
    setPreview(copyPreview);

    //사진의 갯수만큼 URL을 뽑는 for문 (미리보기까지 storage를 사용할 필요는 없으니까.)
    //현재 사진 다중등록을 막고있지만 추후 구현을 위해 for문으로 형성
    for (var i = 0; i < array.length; i++) {
      const reader = new FileReader();
      //0. for문 밖에 두었을땐 에러발생
      //DOMException: Failed to execute 'readAsDataURL' on 'FileReader': The object is already busy reading Blobs.
      //각 readAsDataURL 작동마다 새로운 Reader을 제공하니 해결.

      reader.readAsDataURL(array[i]);
      reader.onload = (e) => {
        //.onload 메서드는 읽기 동작이 성공적으로 완료되었을 때 발동
        setImg(e.target.result)

        newArray.push(e.target.result);
        //onload된 결과물들 src들을 newArray 변수에 담음
      };
    }
  }

  const uploadPost = async (e) => {
    const date = new Date();
    e.preventDefault();

    let tmp_post = {
      writer: user.name,
      writerPic: user.pic,
      date: date,
      layout: layout,
      img: "", //아래에서 추가
      loc: inputLoc.current.value,
      story: inputStory.current.value,
    };

    //참조경로를 만들어주는데
    //storage 안에 "images/" +user.name+ preview[0].name +date 라는 이름으로
    const ImagesRef = ref(
      storage,
      `images/${user.name}:&^@${preview[0].name}:&^@${date}`
    );

    //참조경로에 preview[0]를 업로드. 완료되면 완료!
    //완료되고 URL을 받아와야 하기 때문에 await
    await uploadBytes(ImagesRef, preview[0]).then(() => {
      console.log("Uploaded file!");
    });

    //참조경로 파일의 URL을 받아오기.
    getDownloadURL(ImagesRef).then((url) => {
      tmp_post.img = url;
      //tmp_post의 img에 url추가
    });
    console.log(tmp_post);
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
              onChange={onLocChange}
              required
            ></input>
          </InputBox>
          <br />
          <InputBox>
            <input
              type={"file"}
              ref={inputImg}
              accept={"image/*"}
              onChange={onFileChange}
              required
            />
          </InputBox>
          <br />
          <InputBox>
            <textarea
              ref={inputStory}
              onChange={onStoryChange}
              required
            ></textarea>
          </InputBox>
          <br />
          <button type="submit">다녀왔어요</button>
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

const InputBox = styled.div`
  label {
    font-weight: bolder;
    font-size: smaller;
  }
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
