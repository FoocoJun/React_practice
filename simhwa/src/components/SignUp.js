import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//firebase
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

import { useDispatch } from "react-redux";
import { keepUserDataFB } from "../redux/modules/posts";

import Image from "react-bootstrap/Image";

import SignInBtn from "./btns/SignInBtn";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //입력값 ref
  const id_ref = React.useRef();
  const name_ref = React.useRef();
  const pw_ref = React.useRef();

  //Email과 Password를 가지고 auth에 생성한다.
  var SignUpEmail = "";
  var SignUpPassword = "";
  //닉네임과 프로필사진으로 유저정보를 저장한다.
  var SignUpName = "";
  var SignUpPic = "";
  const [signUpProfilePicture, setSignUpProfilePicture] = React.useState("");

  //프로필 사진preview
  const [signUpProfilePicturePreview, setSignUpProfilePicturePreview] =
    React.useState("");
  //게시글 이름preview
  const [userNamePreview, setUserNamePreview] = React.useState("");

  //프로필 사진 업로드시 미리보기
  function onFileChange(e) {
    let ProfilePic = e.target.files;
    setSignUpProfilePicture([...ProfilePic]);

    const reader = new FileReader();
    reader.readAsDataURL(ProfilePic[0]);
    reader.onload = (e) => {
      setSignUpProfilePicturePreview(e.target.result);
      console.log("ready to preview!");
    };
  }

  const submitSignUp = async (e) => {
    e.preventDefault();
    //auth,db에 올릴 준비
    SignUpEmail = id_ref.current?.value;
    SignUpPassword = pw_ref.current?.value;
    SignUpName = name_ref.current?.value;

    const ImagesRef = ref(
      storage,
      `users/${SignUpName}:&^@${signUpProfilePicture[0].name}`
    );

    await uploadBytes(ImagesRef, signUpProfilePicture[0]).then(() => {
      console.log("Uploaded file!");
    });

    getDownloadURL(ImagesRef).then((url) => {
      SignUpPic = url;
    });

    //
    const user = await createUserWithEmailAndPassword(
      auth,
      SignUpEmail,
      SignUpPassword
    );
    console.log(user);

    const user_data = await setDoc(doc(db, "users", SignUpEmail), {
      user_id: SignUpEmail,
      name: SignUpName,
      pic: SignUpPic,
    });
    console.log(user_data);
    alert("환영합니다.");
    dispatch(keepUserDataFB())
    navigate("/");
  };

  return (
    <>
      <form onSubmit={submitSignUp}>
        <SignUpBox>
          <InputBox>
            <label>이메일 :</label>
            <input type="email" ref={id_ref} required />

            <br />

            <label>닉네임 :</label>
            <input
              type="text"
              ref={name_ref}
              required
              onChange={() => {
                setUserNamePreview(name_ref.current.value);
              }}
            />

            <br />

            <label>비밀번호 :</label>
            <input type="password" ref={pw_ref} required />

            <br />

            <label>프로필 사진 :</label>
            <input
              type={"file"}
              accept={"image/*"}
              onChange={onFileChange}
              required
            />
          </InputBox>

          {signUpProfilePicturePreview && (
            <SignUpPreview>
              <h3>미리보기</h3>
              <Image
                src={signUpProfilePicturePreview}
                width={200}
                height={200}
                roundedCircle
              />
              <h3>게시글</h3>
              <PostPreview>
                <Image
                  src={signUpProfilePicturePreview}
                  roundedCircle
                  width={50}
                  height={50}
                />
                <UserName>{userNamePreview}</UserName>
              </PostPreview>
            </SignUpPreview>
          )}
          <br />
        </SignUpBox>
        <button>회원가입</button>
      </form>
      <br />
      <SignInBtn />
    </>
  );
};

const SignUpBox = styled.div`
  width: 30%;
  min-width: 220px;
  margin: 0 auto;
  text-align: left;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bolder;
    font-size: smaller;
  }
  input {
    border-style: none none solid;
    border-width: 3px;
    border-color: #7d9d9c;
    background-color: #e4dccf;
  }
`;

const SignUpPreview = styled.div`
  text-align: center;
  margin: 20px 0;
  h3 {
    font-weight: bolder;
    margin: 15px 0;
  }
`;

const PostPreview = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: dotted #7d9d9c 0.3rem;
  border-radius: 20px;
`;

const UserName = styled.h4`
  display: inline;
  font-weight: bolder;
  margin: 0 5px;
`;

export default SignUp;
