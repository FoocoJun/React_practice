import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//firebase
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import { useDispatch } from "react-redux";
import { keepUserDataFB } from "../redux/modules/users";

//bootstrap
import Image from "react-bootstrap/Image";
//Components
import SignInBtn from "./btns/SignInBtn";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //입력값 ref
  const id_ref = React.useRef();
  const name_ref = React.useRef();
  const pw_ref = React.useRef();
  const img_ref = React.useRef();

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

  //이메일 유효성검사
  const [isEmailFormCorrect, setIsEmailFormCorrect] = React.useState(true);
  const [isEmailDataDuplicate, setIsEmailDataDuplicate] = React.useState(true);

  //프로필 사진 업로드시 미리보기
  function onFileChange(e) {
    img_ref.current.innerText = null;
    setSignUpProfilePicture(null);
    setSignUpProfilePicturePreview(null);

    const correctForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    if (e.target.files[0].size > 3 * 1024 * 1024) {
      img_ref.current.innerText = "파일 사이즈는 3MB까지만 가능합니다.";
      return;
    } else if (!e.target.files[0].name.match(correctForm)) {
      img_ref.current.innerText = "이미지 파일만 업로드 가능합니다.";
      return;
    }

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
    setIsEmailFormCorrect(true);
    setIsEmailDataDuplicate(true);

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

    await getDownloadURL(ImagesRef).then((url) => {
      SignUpPic = url;
    });

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        SignUpEmail,
        SignUpPassword
      );
      console.log(user); //회원가입은 성공 83번째줄이 await이 없어서 종료가 안되어 94번째 데이터 저장은 실패 ->에러 - >catch 사진 삭제

      const user_data = await setDoc(doc(db, "users", SignUpEmail), {
        user_id: SignUpEmail,
        name: SignUpName,
        pic: SignUpPic
          ? SignUpPic
          : "https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo",
      });
      console.log(user_data);
      alert("환영합니다.");
      dispatch(keepUserDataFB());
      navigate("/");
    } catch (err) {
      console.log(err.message);
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        setIsEmailFormCorrect(false);
      } else if (
        err.message == "Firebase: Error (auth/email-already-in-use)."
      ) {
        setIsEmailDataDuplicate(false);
      } else {
        alert(err.message.substring(10));
      }
      deleteObject(ImagesRef)
        .then(() => {})
        .catch((err) => {
          alert(err.message.substring(10));
        });

      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <form onSubmit={submitSignUp}>
        <SignUpBox>
          <InputBox>
            <label>이메일 :</label>
            <input type="email" ref={id_ref} required />
            {!isEmailFormCorrect && (
              <span style={{ color: "red", fontSize: ".5rem" }}>
                올바른 이메일 형식을 입력해주세요.
              </span>
            )}
            {!isEmailDataDuplicate && (
              <span style={{ color: "red", fontSize: ".5rem" }}>
                이미 가입된 이메일입니다.
              </span>
            )}

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
            <input type="password" ref={pw_ref} minLength="6" required />

            <br />

            <label>프로필 사진 :</label>
            <input
              type={"file"}
              accept={"image/*"}
              onChange={onFileChange}
              required
            />
            <span style={{ color: "red", fontSize: ".5rem" }} ref={img_ref} />
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
        <br />
        {signUpProfilePicture && userNamePreview ? (
          <SignUpButton>회원가입</SignUpButton>
        ) : (
          <SignUpButton style={{ color: "grey" }} disabled>
            회원가입
          </SignUpButton>
        )}
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

const SignUpButton = styled.button`
  border-style: dotted;
  border-width: 3px;
  border-radius: 20px;
  border-color: #7d9d9c;
  background-color: #7d9d9c;
  color: white;
`;

export default SignUp;
