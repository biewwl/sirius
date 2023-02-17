import React from "react";
import Header from "../Header";
import Header_mobile from "../Header_mobile";
import HeaderAside from "../HeaderAside";
import "./styles/HeaderAndAside.css";

function HeaderAndAside() {
  return (
    <>
      <Header />
      <Header_mobile />
      <HeaderAside />
    </>
  );
}

export default HeaderAndAside;
