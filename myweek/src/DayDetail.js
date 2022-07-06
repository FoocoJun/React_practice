import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DayDetail = (props) => {
  const navigate = useNavigate();
  const { days } = useParams(); //:days 로 설정된 주소 URL 가져오기 /detail/화 <---화 가져오기

  const [rate, setRate] = React.useState(0); //점수 rate에 대한 state 생성
  const votedPoint = JSON.parse(JSON.stringify(props.points)); //props 값 깊은 복사
  const setPoints = props.setPoints; //App state points 바꾸는 함수

  const voteToday = () => {
    votedPoint[props.days.indexOf(days)].fill(0).fill(1, 0, rate); //days의 인덱스를 요일표에서 찾아 점수를 업데이트하기.
    setPoints(votedPoint); //App에 적용하기

    navigate("/"); //홈으로 돌아가기
  };

  //Q. props 직접 수정하면 에러뜬다는데 되는 부분.
  //props.points[props.days.indexOf(days)].fill(0).fill(1,0,rate)
  //위 코드를 통해 props의 points에 직접 수정시에도 결과적으로 HowGood의 메인페이지 점수에 정상적으로 영향이 간다.
  //데이터 흐름은 다음과 같다. DayDetail(본인) 수정 -> App(부모) -> Days(형제) -> HowGood(조카)
  //이 경우 리엑트 공식문서 상으로는 App.js에서 useState로 만든 setPoints를 사용하지 않아 컴포넌트 생명주기 중 업데이트가 제대로 작동하지 않음.
  //근데 왜 HowGood에서 제대로 불러오는지 모르겠음..

  //예상 이유
  //props.points를 수정해서 App의 points가 수정되었음.
  //하지만 setPoints를 사용한것은 아니라 부모 컴포넌트의 업데이트가 정상적으로 발생하지는 않음.
  //그럼에도 App의 state 즉, props가 변경된 Days는 업데이트가 진행 됨.
  //이에 App은 바뀌었음에도 업데이트가 없으나(콘솔로그가 작동 안함) Days와 HowGood은 정상작동(결과물 굿).
  //언제 어디서 꼬일지 모름. 쓰면 안될 것만 같음.

  //예상이유+ 현재
  //얕은 복사가 문제였나? 싶어서 JSON을 이용한 깊은 복사 후 사용해봄
  //깊은 복사시 App에 전달되는 변동사항이 없어서 Days 및 HowGood에 제대로 미적용.
  //setPoints로 접근하여 정상적으로 App state 수정 -> App 컴포넌트 업데이트 발생 -> Days 업데이트 -> HowGood 업데이트

  return (
    <div>
      <Tilte>
        {" "}
        <span>{days}요일</span> 평점 남기기
      </Tilte>
      <CheckWrap>
        {Array.from({ length: 5 }, (val, idx) => {
          return (
            <Checkbox
              key={idx}
              onClick={() => setRate(idx + 1)} //클릭 시 각 Check박스에 할당된 idx 값+1만큼 점수(rate) 재설정
              style={{ backgroundColor: rate < idx + 1 ? "grey" : "orange" }}
            />
          );
        })}
      </CheckWrap>
      <VoteWrap>
        <button onClick={voteToday}>
          평점 남기기
        </button>
      </VoteWrap>
    </div>
  );
};

const Tilte = styled.h3`
  text-align: center;
  span {
    background-color: orange;
    border-radius: 10%;
    color: white;
    padding: 3px 3px;
  }
`;

const CheckWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0px;
  width: 100%;
`;

const Checkbox = styled.div`
  width: 20px;
  height: 30px;
  border-radius: 30px;
  margin: 5px;
`;

const VoteWrap = styled.div`
  text-align: center;
`;

export default DayDetail;
