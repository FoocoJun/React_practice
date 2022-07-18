import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

//Components
import Header from "./components/Header";
import Upload from "./components/Upload";
import FeedBox from "./components/FeedBox";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [isLogin, setIsLogin] = React.useState(false);

  const loginCheck = (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <div className="App">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}/>

      <section
        style={{
          margin: "0 auto",
          paddingTop: "40px",
        }}
      >
        <Routes>
          <Route path="/" element={<FeedBox />} />
          <Route path="/upload" element={<Upload isLogin={isLogin}/>} />
          <Route path="/signup" element={<SignUp isLogin={isLogin}/>} />
          <Route path="/signin" element={<SignIn isLogin={isLogin}/>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
