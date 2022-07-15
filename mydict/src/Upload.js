import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Home from "./Home";

import { useDispatch, useSelector } from "react-redux";
import { createDictFB } from "./redux/modules/dict";

function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const input_word = React.useRef(null);
  const input_def = React.useRef(null);
  const input_ex = React.useRef(null);
  const count = useSelector((state) => state.dict.dict.length); //App.js에서 정의한 store 중 dict라는 모듈에서 정의한 dict값의 길이

  const addWord = (e) => {
    let tmp_dict = {
      word: input_word.current.value,
      def: input_def.current.value,
      ex: input_ex.current.value,
      num: count,
    };

    dispatch(createDictFB(tmp_dict));
    navigate("/");
    alert("정상적으로 등록되었습니다.");
    e.preventDefault();

    //트러블 슈팅 0.
    //Form submission canceled because the form is not connected
    //submit에 의한 form 작동 중 Line30 (navigate("/"))가 실행 되며 발생함.
    //그 이유는 navigate에 의한 페이지 이동이 submit에 의한 자동 새로고침을 막았기 때문.(개별적인 함수내 정의 기능들은 작동)
    //
    //preventDefault()를 사용하면 이벤트의 기본 동작을 실행하지 않도록 지정할 수 있다.
    //이를 이용해 submit태그를 통한 데이터 전달은 정상적으로 작동하며 페이지 새로고침만 막을 수 있게 되었다.
  };

  return (
    <>
      <Home />
      <Adding>
        <h2>단어 추가하기</h2>
        <div>
          <form onSubmit={addWord}>
            <InputBox>
              <label htmlFor="input-word">단어</label>
              <br />
              <input
                type="text"
                id="input-word"
                ref={input_word}
                required
              ></input>
            </InputBox>
            <InputBox>
              <label htmlFor="input-def">의미</label>
              <br />
              <input
                type="text"
                id="input-def"
                ref={input_def}
                required
              ></input>
            </InputBox>
            <InputBox>
              <label htmlFor="input-ex">예문</label>
              <br />
              <input type="text" id="input-ex" ref={input_ex} required></input>
            </InputBox>
            <div style={{ textAlign: "center" }}>
              <Button type="submit">등록하기</Button>
            </div>
          </form>
        </div>
      </Adding>
    </>
  );
}

const Adding = styled.div`
  h2 {
    font-size: 1.2rem;
    font-weight: bolder;
    margin-top: 35px;
    text-align: center;
  }
  hr {
    border-style: dotted;
    margin: 20px auto;
    width: 80%;
  }
  div {
    width: 60%;
    text-align: left;
    margin: 20px auto;
  }
`;

const InputBox = styled.div`
  label {
    font-weight: bolder;
    font-size: smaller;
  }
  input {
    border-style: none none solid;
    border-color: skyblue;
    width: 100%;
  }
`;

export default Upload;
