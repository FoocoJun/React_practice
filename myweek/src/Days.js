import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HowGood from "./HowGood";

const Days = (props) => {
  const my_days = props.days;
  const day_points = props.points;
  const avg_points = (day_points.flat().reduce((a, b) => a + b) / 7).toFixed(1);

  const reset = () => window.location.replace("/");

  return (
    <div>
      <Title>내 일주일은?</Title>
      {my_days.map((days, index) => {
        return (
          <DaysWrap key={index}>
            <p>{days}</p>
            <HowGood point={day_points[index]} />
            <GoTo>
              <Link
                to={"/detail/" + days}
                style={{
                  textDecoration: "none",
                }}
              >
                🔺
              </Link>
            </GoTo>
          </DaysWrap>
        );
      })}
      <AvgWrap>
        <h2>평균 평점</h2>
        <h2>{avg_points}</h2>
        <button onClick={reset}>Reset</button>
      </AvgWrap>
    </div>
  );
};

const Title = styled.h3`
  color: black;
  text-align: center;
`;

const DaysWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: auto;
  padding: 0px 40px;
  margin: 10px auto;
  p {
    max-width: 100%;
    margin: 0;
  }
`;

const GoTo = styled.div`
  transform: rotate(90deg);
`;

const AvgWrap = styled.div`
  text-align: center;
`;

export default Days;
