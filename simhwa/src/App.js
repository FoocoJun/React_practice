import "./App.css";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import { keepUserDataFB } from "./redux/modules/users";
import { loadPostFB } from "./redux/modules/posts";

//Components
import Header from "./components/Header";
import Upload from "./components/Upload";
import FeedBox from "./components/FeedBox";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PostDetail from "./components/PostDetail";
import UserDetail from "./components/UserDetail";

function App() {
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(keepUserDataFB());
    dispatch(loadPostFB());
  }, []);

  return (
    <div className="App">
      <Header />

      <section
        style={{
          margin: "0 auto",
          paddingTop: "40px",
        }}
      >
        <Routes>
          <Route path="/" element={<FeedBox />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/detail/:postId" element={<PostDetail />} />
          <Route path="/user/:userName" element={<UserDetail />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
