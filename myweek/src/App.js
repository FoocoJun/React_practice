import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import React from "react";

import Days from "./Days";
import DayDetail from "./DayDetail";

function App() {
  const vote = React.useRef(null);

  const [days, setDays] = React.useState([
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
    "일",
  ]);

  const randomPoints = Array.from({ length: 7 }, () =>
    Array(5).fill(0).fill(1, 0, getRandomInt(1, 6))
  );
  //test 미리 안만들고 useState 안에서 반복하면 참조하는 자녀 컴포넌트에서 undefined 뜸

  const [points, setPoints] = React.useState(randomPoints);
  console.log(points);

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Days days={days} points={points} setPoints={setPoints} />}
          />
          <Route
            path="/detail/:days"
            element={
              <DayDetail days={days} points={points} setPoints={setPoints} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 300px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

//정수 난수 생성기
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export default App;
