import React from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";

import SignUpBtn from "./btns/SignUpBtn";

const SignIn = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef();
  const pw_ref = React.useRef();

  const loginFB = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    alert("환영합니다.");
    navigate("/");
  };

  return (
    <>
      <form onSubmit={loginFB}>
        <SignInBox>
          <InputBox>
            <label>이메일 : </label>
            <input ref={id_ref} required /> <br />
            <label>비밀번호 : </label>
            <input type="password" ref={pw_ref} required />
            <br />
          </InputBox>
        </SignInBox>
        <button>로그인</button>
      </form>
      <br/>
      <SignUpBtn/>
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

export default SignIn;
