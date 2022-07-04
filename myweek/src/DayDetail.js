import React, { useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const DayDetail = (props) => {
    const navigate = useNavigate();
    const {days} = useParams();
    const [rate, setRate] = React.useState(0);
    
    const voteToday = () => {
        props.points[props.days.indexOf(days)].fill(0).fill(1,0,rate)    //날짜의 인덱스를 찾아 점수를 불러오기.
        console.log(props.points[props.days.indexOf(days)])
        navigate("/")

    }
    
    return (
        <div>
            <Tilte> <span>{days}요일</span> 평점 남기기</Tilte>
            <CheckWrap >
                {Array.from({length: 5}, (val, idx) => {
                    return (
                        <Checkbox
                        key={idx}
                        onClick={()=> setRate(idx+1)}
                        style={{backgroundColor : rate < idx+1 ? "grey" : "orange"}}/>
                    )
                })}
            </CheckWrap>
            <VoteWrap>
            <button onClick={voteToday}>평점 남기기</button>
            </VoteWrap>
            

        </div>
    )

}

const Tilte = styled.h3 `
text-align:center;
span {
    background-color:orange;
    border-radius:10%;
    color:white;
    padding:3px 3px;
}
`

const CheckWrap = styled.div `
display: flex;
justify-content: center;
align-items: center;
margin: 1rem 0px;
width: 100%;
`

const Checkbox = styled.div `
width: 20px;
height: 30px;
border-radius: 30px;
margin: 5px;
`

const VoteWrap = styled.div `
text-align: center;
`

export default DayDetail