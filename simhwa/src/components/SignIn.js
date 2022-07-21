import React from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { keepUserDataFB } from "../redux/modules/users";

//Components
import SignUpBtn from "./btns/SignUpBtn";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id_ref = React.useRef();
  const pw_ref = React.useRef();
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(true);

  const submitSignIn = async (e) => {
    setIsPasswordCorrect(true);

    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        id_ref.current.value,
        pw_ref.current.value
      );
      alert("환영합니다.");
      dispatch(keepUserDataFB());
      navigate("/");
    } catch (err) {
      if (err.message.includes("auth/wrong-password")) {
        setIsPasswordCorrect(false);
      }
      else {
        alert(err.message.substring(10))
      }
    }
  };

  return (
    <>
      <form onSubmit={submitSignIn}>
        <SignInBox>
          <InputBox>
            <label>이메일 : </label>
            <input ref={id_ref} type="email" required /> <br />
            <label>비밀번호 : </label>
            <input type="password" ref={pw_ref} required />
            {!isPasswordCorrect && (
              <span style={{ color: "red" }}>비밀번호가 틀렸습니다.</span>
            )}
            <br />
          </InputBox>
        </SignInBox>
        <br />
          <SignInButton>로그인</SignInButton>
        
      </form>
      <br />
      <SignUpBtn />
    </>
  );
};

const SignInBox = styled.div`
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

const SignInButton = styled.button`
  border-style: dotted;
  border-width: 3px;
  border-radius: 20px;
  border-color: #7d9d9c;
  background-color: #7d9d9c;
  color: white;
`;

export default SignIn;
