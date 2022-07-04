import React from "react";
import styled from "styled-components";

const HowGood = (props) => {
    console.log(props.point)

    return (
        <PointWrap>
            {props.point.map((n,v) => {
                return (
                    n===1 ? <PointCircle key={v}/> : <PointCircle key={v} style={{background:"grey"}}/>
                )
            })}
        </PointWrap>
    )

}

const PointWrap = styled.div `
display: flex;
align-items: left;
margin: auto;
padding: 15px ;
margin: 0 auto;
`

const PointCircle = styled.div `
width: 1.5rem;
height: 1.5rem;
background: orange;
margin: 0 3px;
border-Radius: 100%;
display: inline-block;

`

export default HowGood;