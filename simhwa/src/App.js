import "./App.css";

import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Header from "./components/Header";
import Upload from "./components/Upload";
import FeedBox from "./components/FeedBox";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
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
        </Routes>
      </section>
    </div>
  );
}

export default App;
