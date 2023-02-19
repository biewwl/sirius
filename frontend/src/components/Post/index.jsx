import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import "./styles/Post.css";
import { verifiedType } from "../../helpers";

function Post({ postData }) {
  const [currentTimer, setCurrentTimer] = useState("-");
  const [currentFormat, setCurrentFormat] = useState("-");

  const formatTimer = (seconds) => {
    let timer = Math.floor(seconds);
    let format = "s";
    if (seconds > 60) {
      timer = Math.floor(seconds / 60);
      format = "m";
    }
    if (format === "m" && timer > 60) {
      timer = Math.floor(timer / 60);
      format = "h";
    }
    if (format === "h" && timer >= 24) {
      timer = Math.floor(timer / 24);
      format = "d";
    }
    if (format === "d" && timer >= 30) {
      timer = Math.floor(timer / 30);
      format = "mo";
    }
    if (format === "mo" && timer >= 12) {
      timer = Math.floor(timer / 12);
      format = "y";
    }
    return {
      timer,
      format,
    };
  };

  const elapsedTime = (date) => {
    const currentDate = new Date();
    const [justPostDate] = date.split(".");
    const postDate = new Date(justPostDate);
    const timeDiff = currentDate - postDate;
    const seconds = timeDiff / 1000;
    return formatTimer(seconds);
  };

  useEffect(() => {
    const getTimer = () => {
      const interval = setInterval(() => {
        const { timer, format } = elapsedTime(date);
        console.log(timer);
        setCurrentTimer(timer);
        setCurrentFormat(format);
      }, 1000);
      return interval;
    };
    const interval = getTimer();
    return () => clearInterval(interval);
  }, [postData]);

  const { caption, date, imageUrl, userPost } = postData;
  const { avatarUrl, name, nick, accountVerified } = userPost;
  const { icon, text } = verifiedType(accountVerified);
  const isVerified = accountVerified !== "none";

  return (
    <section className="post">
      <div className="post__header">
        <img src={avatarUrl} alt="" className="post__user-avatar" />
        <div>
          <div className="name_nick">
            <span className="name">
              {name}
              {isVerified && (
                <div title={text}>
                  <Icon icon={icon} className={`verified-${accountVerified}`} />
                </div>
              )}
            </span>
            |<span className="nick">@{nick}</span>
          </div>
          <span className="timer">
            {currentTimer}
            {currentFormat}
          </span>
        </div>
      </div>
      <span className="post__caption">{caption}</span>
      <img src={imageUrl} alt="" className="post__image" />
    </section>
  );
}

export default Post;

Post.propTypes = {
  postData: PropTypes.shape(),
};
