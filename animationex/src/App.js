import logo from './logo.svg';
import './App.css';
import styled, {keyframes} from 'styled-components'

function App() {
  
  
  return (
    <div className="App">
      <Box onClick={()=>alert('축하드립니다. 쿠폰함을 확인하세요!')}></Box>
    </div>
  );
}

//정수 난수 생성기
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}



const MovingBox = keyframes`
0% {
  border-radius:100%;
  top:${getRandomInt(20, 80)}%;
  left:${getRandomInt(20, 80)}%;
  
}
50% {
  border-radius:0%;
  top:${getRandomInt(20, 80)}%;
  left:${getRandomInt(20, 80)}%;
}
100% {
  border-radius:100%;
  top:${getRandomInt(20, 80)}%;
  left:${getRandomInt(20, 80)}%;
}
`

const Box = styled.div `
height: 100px;
width: 100px;
background-color: green;

position:absolute;


animation: ${MovingBox} 2s infinite linear alternate;
`



export default App;
