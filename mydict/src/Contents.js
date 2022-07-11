import React from "react";
import styled from "styled-components";

//Bootstrap
import { Col } from "react-bootstrap";

function Contents({ dict }) {
  var box = React.useRef(null);
  var word = React.useRef(dict.word);
  var def = React.useRef(dict.def);
  var ex = React.useRef(dict.ex);

  //Event
  const hoverShow = () => {
    box.current.style.position = "absolute";
    box.current.style.minWidth = "415px";
    box.current.style.width="25%";

    word.current.innerText = dict.word;
    def.current.innerText = dict.def;
    ex.current.innerText = dict.ex;
  };

  const hoverOut = () => {
    box.current.style.position = "static";
    box.current.style.minWidth = "0px";
    box.current.style.width = "95%";
    word.current.innerText =
      dict.word.length > 15 ? dict.word.substring(0, 15) + "..." : dict.word;
    def.current.innerText =
      dict.def.length > 20 ? dict.def.substring(0, 20) + "..." : dict.def;
    ex.current.innerText =
      dict.ex.length > 30 ? dict.ex.substring(0, 30) + "..." : dict.ex;
  };

  React.useEffect(() => {
    box.current.addEventListener("mouseover", hoverShow);
    box.current.addEventListener("mouseout", hoverOut);

    return () => {
      // word.current.removeEventListener("mouseover", hoverShow);
      // word.current.removeEventListener("mouseout", hoverOut);
      //
      //0.
      //위 코드는 unmount 이후 removeEventListener이 word에 대해 호출하고 있음.
      //이에 word는 undefined가 되어버리고,
      //Cannot read properties of null (reading 'removeEventListener') 라는 에러가 나옴.
      //
      //IE8 이상 및 Chrome 은 removeEventListener이 없어도 event가 중첩되는 현상 보이지 않음.
      //따라서 제거함.
    };
  }, []);

  return (
    <Col xs={12} md={6} lg={4}>
      <Content ref={box}>
        {/* 상자가 망가지는 것을 방지하기 위해 글자수로 자름- 데이터는 유효 */}
        <div>
          <h4 ref={word}>
            {dict.word.length > 20
              ? dict.word.substring(0, 20) + "..."
              : dict.word}
          </h4>
          <h5 ref={def}>
            {dict.def.length > 30
              ? dict.def.substring(0, 30) + "..."
              : dict.def}
          </h5>
          <h6 ref={ex}>
            {dict.ex.length > 30 ? dict.ex.substring(0, 30) + "..." : dict.ex}
          </h6>
        </div>
      </Content>
    </Col>
  );
}

const Content = styled.div`
  height : fit-content;
  width: 95%;

  background-color: skyblue;
  border-radius: 5%;
  margin: 5px auto;
  
  word-break: normal;

  &:hover {
    //&은 자기자신을 지칭한다.
    box-shadow: 0px 0px 5px grey;
  }
  div {
    background-color: white;
    margin: auto;
    padding: 1vw;
    width: 98%;
  }
  h6 {
    color: blue;
  }
`;

const Toolbar = styled.div`
  display: inline;
  width: fit-content;
`;

export default Contents;
