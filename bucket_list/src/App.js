import React from 'react';
import logo from './logo.svg';
// BucketList 컴포넌트를 import 해옵니다. import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from './BucketList';
import styled from 'styled-components'

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {

    constructor(props) {
        super(props);
        // App 컴포넌트의 state를 정의해줍니다.
        this.state = {
            list: ['영화관 가기', '매일 책읽기', '수영 배우기']
        };
        this.text = React.createRef()
    }

    // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
    render() {
        // this 키워드를 통해 state에 접근할 수 있어요.
        console.log(this.state);

        return (
            <DivApp>
                <MyStyled>
                    <h1>내 버킷리스트</h1>
                    <hr/> {/* 컴포넌트를 넣어줍니다. */}
                    {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
                    <BucketList list={this.state.list}/>
                </MyStyled>
                <div>
                  <input type="text" onChange={()=>console.log(this.text.current.value)} ref={this.text}/>
                </div>
            </DivApp>
        );
    }
}
const DivApp = styled.div `
    background-color: #eee;
    height: 100vh;
    width: 100vw;
    display: flex;
`

const MyStyled = styled.div `
    background-color: #fff;
    width: 50vw;
    max-width: 350px;
    margin: auto;
    height: 80vh;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    h1 {
      color: slateblue;
      text-align: center;
    }
    hr {
      margin: 16px 0;
    }
`

export default App;