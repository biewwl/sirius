import React from "react";
import HeaderAndAside from "../../components/HeaderAndAside";
import AsideStories from "../../components/AsideStories";
import "./styles/Notifications.css";

function Notifications() {
  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className="notifications-content"></main>
      <AsideStories />
    </div>
  );
}

export default Notifications;
