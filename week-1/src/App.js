import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{width:'50%', margin:'0 auto'}}>안녕하세요!</h1>
        <hr style={{width:'100%'}}/>
        <form>
        <label for="">이름을 입력해주세요.</label><br/>
        <input type="text"/>
        </form>
      </header>
    </div>
  );
}

export default App;
