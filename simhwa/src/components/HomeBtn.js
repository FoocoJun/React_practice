import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Font-Awesome
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomeBtn() {
  return (
    <ToHome>
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
        }}
      >
        <FontAwesomeIcon icon={faHouseChimney} size={"1x"} color={"skyblue"} />
      </Link>
    </ToHome>
  );
}

const ToHome = styled.div`
  background-color: white;
  border-radius: 100%;

`;

export default HomeBtn;
